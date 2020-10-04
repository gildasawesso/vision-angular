import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Registration} from '../../core/models/registration';
import {FeeType} from '../../core/models/fee-type';
import {Utils} from '../../core/shared/utils';
import {ReductionsComponent} from '../../finance/reductions/reductions.component';
import {AbstractControl, FormArray, FormBuilder, FormControl} from '@angular/forms';
import {FeeTypesRepository} from '../../core/repositories/fee-types.repository';
import {PaymentsRepository} from '../../core/repositories/payments.repository';
import {Payment} from '../../core/models/payment';
import * as moment from 'moment';
import {RegistrationsRepository} from '../../core/repositories/registrations.repository';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayComponent implements OnInit {

  paymentLineForm = this.formBuilder.array([]);

  registration: Registration;
  defaultFee: FeeType;
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
              private registrationRepository: RegistrationsRepository) {
    this.registration = this.data.registration;
    this.defaultFee = this.data.defaultFee;
    this.isRegistration = this.data.isRegistration ?? false;

    const group = this.formBuilder.group({
      fee: this.defaultFee,
      amount: [0, this.validateAmount(this.defaultFee)]
    });
    this.paymentLines.push(group);
  }

  async save() {
    if (this.utils.form.isValid(this.paymentLineForm)) {
      const paymentLines = this.paymentLines.value;

      try {
        let payment: Payment;
        if (this.isRegistration) {
          const registration = await this.registrationRepository.add(this.registration);

          const paymentLike: Payment = {
            school: registration.school,
            classroom: registration.classroom,
            amount: paymentLines.reduce((acc, cur) => acc + cur.amount, 0),
            paymentLines: paymentLines.map(line => ({fee: line.fee._id, amount: line.amount})),
            paymentDate: this.paymentDate.value,
            student: registration.student,
            schoolYear: registration.schoolYear
          };
          payment = await this.paymentsRepository.add(paymentLike);
        } else {
          const paymentLike: Payment = {
            school: this.registration.school,
            classroom: this.registration.classroom._id,
            amount: paymentLines.reduce((acc, cur) => acc + cur.amount, 0),
            paymentLines: paymentLines.map(line => ({fee: line.fee._id, amount: line.amount})),
            paymentDate: this.paymentDate.value,
            student: this.registration.student._id,
            schoolYear: this.registration.schoolYear._id,
            _classroom: this.registration.classroom,
            _student: this.registration.student
          };
          payment = await this.paymentsRepository.add(paymentLike);
        }

        const message = this.isRegistration ? `Inscription réalisée avec succès` : `Payement effectué`;
        const result = await this.utils.common.customAlert(message, '', ['Annuler', 'Imprimer le reçu']);

        if (result === 1) {
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

  validateAmount(fee: FeeType) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (Number(control.value) > this.remainingPayments(fee)) {
        return {exceeded: true};
      } else {
        return null;
      }
    };
  }

  pastPayments(fee: FeeType) {
    if (this.studentPayments === undefined) {
      return 0;
    }

    const feePayments = this.studentPayments.map(p => {
      const paymentLine = p.paymentLines.find(line => line.fee === fee._id);
      return paymentLine ? paymentLine.amount : 0;
    });
    return feePayments.reduce((acc, cur) => acc + cur, 0);
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
      if (p == null) {
        return;
      }

      this.studentPayments = p[`classrooms`][this.registration.classroom._id][`students`][this.registration.student._id];
    });
  }
}
