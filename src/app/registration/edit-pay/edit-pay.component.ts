import {ChangeDetectorRef, Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PaymentsRepository} from '../../core/repositories/payments.repository';
import {Repositories} from '../../core/repositories/repositories';
import {Utils} from '../../core/shared/utils';
import {ClassroomsRepository} from '../../core/repositories/classrooms.repository';
import {RegistrationsRepository} from '../../core/repositories/registrations.repository';
import {AbstractControl, FormArray, FormBuilder, FormControl} from '@angular/forms';
import {Student} from '../../core/models/student';
import {Classroom} from '../../core/models/classroom';
import {Registration} from '../../core/models/registration';
import {Payment} from '../../core/models/payment';
import {constants} from '../../core/constants';
import * as moment from 'moment';
import {StudentChooserComponent} from '../../core/shared/components/student-chooser/student-chooser.component';
import {PayComponent} from '../pay/pay.component';
import {EditPaymentComponent} from '../../finance/payments/edit-payment/edit-payment.component';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {FeeType} from '../../core/models/fee-type';
import {ReductionsComponent} from '../../finance/reductions/reductions.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FeeTypesRepository} from '../../core/repositories/fee-types.repository';

@Component({
  selector: 'app-edit-pay',
  templateUrl: './edit-pay.component.html',
  styleUrls: ['./edit-pay.component.scss']
})
export class EditPayComponent implements OnInit {

  paymentLineForm = this.formBuilder.array([]);

  registration: Registration;
  defaultFee: FeeType;
  payment: Payment;
  isRegistration = false;
  value: any;
  studentPayments: Payment[];

  feesAvailable: FeeType[];
  fees: FeeType[];
  feeToPay = new FormControl();
  paymentDate = new FormControl(moment());

  get paymentLines() {
    return this.paymentLineForm as FormArray;
  }

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<PayComponent>,
              public utils: Utils,
              private change: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              private feeTypesRepository: FeeTypesRepository,
              private paymentsRepository: PaymentsRepository,
              private registrationRepository: RegistrationsRepository,
              private repo: Repositories) {
    this.registration = this.data.registration;
    console.log(this.registration);
    this.payment = this.data.payment;

    this.loadFees();
  }

  async loadFees() {
    for (const line of this.payment.paymentLines) {
      const fee = await this.repo.fees.one(line.fee);
      const group = this.formBuilder.group({
        fee,
        amount: [line.amount, this.validateAmount(fee, line.amount)],
        remaining: this.remainingPayments(fee, line.amount),
        pastPayments: this.pastPayments(fee, line.amount),
        reduction: this.reductionWithLabel(fee)
      });
      this.paymentLines.push(group);
    }
  }

  async save() {
    if (this.utils.form.isValid(this.paymentLineForm)) {
      const paymentLines = this.paymentLines.value;
      try {
        const paymentLike: any = {
          amount: paymentLines.reduce((acc, cur) => acc + cur.amount, 0),
          paymentLines: paymentLines.map(line => ({fee: line.fee._id, amount: line.amount})),
          paymentDate: this.paymentDate.value,
        };
        const payment = await this.repo.payments.update(paymentLike, this.payment._id);

        const message = `Modification effectuée`;
        const result = await this.utils.common.customAlert(message, '', ['Imprimer le reçu', 'Revenir']);

        if (result === 0) {
          try {
            await this.utils.print.registrationReceipt(payment as Payment);
            this.dialogRef.close(true);
          } catch (e) {
            console.error(e);
            this.utils.common.alert(`Une erreur est survenue lors de l'impression du ticket`, `Erreur`);
          }
        } else {
          this.dialogRef.close(true);
        }
      } catch (e) {
        console.error(e);
        this.utils.common.alert(JSON.stringify(e.error), `Une erreur est survenue`);
        this.dialogRef.close(true);
      }
    }
  }

  validateAmount(fee: FeeType, alreadyPayed: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (Number(control.value) > this.remainingPayments(fee, alreadyPayed)) {
        return {exceeded: true};
      } else {
        return null;
      }
    };
  }

  pastPayments(fee: FeeType, alreadyPayed) {
    if (this.studentPayments === undefined) {
      return 0;
    }

    const feePayments = this.studentPayments.map(p => {
      const paymentLine = p.paymentLines.find(line => line.fee === fee._id);
      return paymentLine ? paymentLine.amount : 0;
    });
    return feePayments.reduce((acc, cur) => acc + cur, 0) - alreadyPayed;
  }

  reductionWithLabel(fee: FeeType) {
    if (this.registration.reductions === undefined || this.registration.reductions == null) {
      return 'Pas de réduction';
    }
    const reduction = this.registration.reductions.find(r => r.fee === fee._id);
    if (reduction) {
      if (reduction.reductionType === 'percentage') {
        return `-${reduction.reduction}% (${reduction.reduction / 100 * fee.amount} F)`;
      } else {
        return `-${reduction.reduction} F`;
      }
    } else {
      return 'Pas de réduction';
    }
  }

  reduction(fee: FeeType) {
    if (this.registration.reductions === undefined || this.registration.reductions == null) {
      return 0;
    }
    const reduction = this.registration.reductions.find(r => r.fee === fee._id);
    if (reduction) {
      if (reduction.reductionType === 'percentage') {
        return reduction.reduction / 100 * fee.amount;
      } else {
        return reduction.reduction;
      }
    } else {
      return 0;
    }
  }

  remainingPayments(fee: FeeType, alreadyPayed: number) {
    return fee.amount - this.pastPayments(fee, alreadyPayed) - this.reduction(fee);
  }

  async reductions() {
    await this.utils.common.modal(ReductionsComponent, this.registration);
    this.paymentLines.clear();
    await this.loadFees();
  }

  ngOnInit(): void {
    this.feeTypesRepository.stream.subscribe(fees => {
      this.fees = fees;
      this.feesAvailable = [...this.fees];

      this.payment.paymentLines.forEach(line => {
        const index = this.feesAvailable.findIndex(fee => fee._id === line.fee);
        this.feesAvailable.splice(index, 1);
      });
    });

    this.feeToPay.valueChanges.subscribe((f: FeeType) => {
      const group = this.formBuilder.group({
        fee: f,
        amount: [0, this.validateAmount(f, 0)]
      });
      this.paymentLines.push(group);
      const index = this.feesAvailable.findIndex(fee => fee._id === f._id);
      this.feesAvailable.splice(index, 1);
    });

    this.paymentsRepository.classroomsPayments.subscribe(p => {
      if (p == null) {
        return;
      }

      this.studentPayments = p[`classrooms`][this.registration.classroom._id][`students`][this.registration.student._id];
    });
  }
}
