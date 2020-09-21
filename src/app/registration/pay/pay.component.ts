import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Registration} from '../../core/models/registration';
import {FeeType} from '../../core/models/fee-type';
import {Utils} from '../../core/shared/utils';
import {ReductionsComponent} from '../../finance/reductions/reductions.component';
import {AbstractControl, FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {FeeTypesRepository} from '../../core/repositories/fee-types.repository';
import {PaymentsRepository} from '../../core/repositories/payments.repository';
import {Payment} from '../../core/models/payment';
import {Reduction} from '../../core/models/reduction';
import {PaymentLine} from '../../core/models/payment-line';
import * as moment from 'moment';
import {RegistrationsRepository} from '../../core/repositories/registrations.repository';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  paymentLineForm = this.formBuilder.array([]);

  registration: Registration;
  defaultFee: FeeType;
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
              private registrationRepository: RegistrationsRepository) {
    this.registration = this.data.registration;
    this.defaultFee = this.data.defaultFee;

    const group = this.formBuilder.group({
      fee: this.defaultFee,
      amount: [0, this.validateAmount(this.defaultFee)]
    });
    this.paymentLines.push(group);
  }

  async save() {
    if (this.utils.form.isValid(this.paymentLineForm)) {
      const paymentLines: PaymentLine[]  = this.paymentLines.value;

      try {
        const registration = await this.registrationRepository.add(this.registration);

        const paymentLike = new Payment();
        paymentLike.classroom = registration.classroom;
        paymentLike.amount = paymentLines.reduce((acc, cur) => acc + cur.amount, 0);
        paymentLike.fees = paymentLines;
        paymentLike.paymentDate = this.paymentDate.value;
        paymentLike.student = registration.student;
        paymentLike.schoolYear = registration.schoolYear;
        const payment = await this.paymentsRepository.add(paymentLike);

        const message = `L'élève ${registration.student.firstname} ${registration.student.lastname} est inscrit avec succès à la classe de ${registration.classroom.name}`;
        await this.utils.common.customAlert(message, '', ['Imprimer le reçu']);

        try {
          await this.utils.print.registrationReceipt(payment);
        } catch (e) {
          this.utils.common.alert(`Une erreur est survenue lors de l'impression du ticket`, `Erreur`);
        }
        this.dialogRef.close(true);
      } catch (e) {
        console.error(e);
        this.utils.common.alert(JSON.stringify(e.error), `Une erreur est survenue`);
        this.dialogRef.close(true);
      }
    }
  }

  validateAmount(fee: FeeType) {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (Number(control.value) > this.remainingPayments(fee)) {
        return { exceeded: true };
      } else {
        return null;
      }
    };
  }

  pastPayments(fee: FeeType) {
    if (this.studentPayments === undefined ) { return 0; }

    const feePayments = this.studentPayments.map(p => {
      const paymentLine = p.fees.find(f => f.fee._id === fee._id);
      return paymentLine ? paymentLine.amount : 0;
    });
    return feePayments.reduce((acc, cur) => acc + cur, 0);
  }

  reduction(fee: FeeType) {
    if (this.registration.reductions === undefined || this.registration.reductions == null) { return 0; }
    const reduction = this.registration.reductions.find(r => r.fee._id === fee._id);
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

  remainingPayments(fee: FeeType) {
    return fee.amount - this.pastPayments(fee) - this.reduction(fee);
  }

  async reductions() {
    await this.utils.common.modal(ReductionsComponent, this.registration);
    this.change.detectChanges();
    this.paymentLineForm.controls.forEach(c => {
      c.updateValueAndValidity();
      c.get('amount').updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.feeTypesRepository.stream.subscribe(fees => {
      this.fees = fees;
      this.feesAvailable = [...this.fees];

      const index = this.feesAvailable.findIndex(fee => fee._id === this.defaultFee._id);
      this.feesAvailable.splice(index, 1);
    });

    this.feeToPay.valueChanges.subscribe((f: FeeType) => {
      const group = this.formBuilder.group({
        fee: f,
        amount: [0, this.validateAmount(f)]
      });
      this.paymentLines.push(group);
      const index = this.feesAvailable.findIndex(fee => fee._id === f._id);
      this.feesAvailable.splice(index, 1);
    });

    this.paymentsRepository.classroomsPayments.subscribe(p => {
      if (p == null) { return; }

      this.studentPayments = p[`classrooms`][this.registration.classroom._id][`students`][this.registration.student._id];
    });
  }
}
