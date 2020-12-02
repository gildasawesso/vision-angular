import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Registration} from '../../core/models/registration';
import {FeeType} from '../../core/models/fee-type';
import {Utils} from '../../core/shared/utils';
import {ReductionsComponent} from '../reductions/reductions.component';
import {AbstractControl, FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {FeeTypesRepository} from '../../core/repositories/fee-types.repository';
import {PaymentsRepository} from '../../core/repositories/payments.repository';
import {Payment} from '../../core/models/payment';
import * as moment from 'moment';
import {RegistrationsRepository} from '../../core/repositories/registrations.repository';
import {Repositories} from '../../core/repositories/repositories';
import {Classroom} from '../../core/models/classroom';
import {SpacedPipe} from '../../core/shared/pipes/spaced.pipe';

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
  classrooms: Classroom[];

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
              private spaced: SpacedPipe,
              private repo: Repositories) {
    this.registration = this.data.registration;
    this.defaultFee = this.data.defaultFee;
    this.isRegistration = this.data.isRegistration ?? false;

    const group = this.formBuilder.group({
      fee: this.defaultFee,
      amount: [0, [this.validateAmount(this.defaultFee), Validators.min(0)]]
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
            paymentLines: paymentLines.map(line => ({feeId: line.fee._id, amount: line.amount})),
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
            paymentLines: paymentLines.map(line => ({feeId: line.fee._id, amount: line.amount})),
            paymentDate: this.paymentDate.value,
            student: this.registration.student._id,
            schoolYear: this.registration.schoolYear._id,
            _classroom: this.registration.classroom,
            _student: this.registration.student
          };
          payment = await this.paymentsRepository.add(paymentLike);
        }

        const message = this.isRegistration ? `Inscription réalisée avec succès` : `Payement effectué`;
        const result = await this.utils.common.customAlert(message, '', ['Revenir', 'Imprimer le reçu']);

        if (result === 1) {
          try {
            await this.utils.print.registrationReceipt(payment as Payment);
            this.dialogRef.close(true);
          } catch (e) {
            console.error(e);
            this.utils.common.alert(`Une erreur est survenue lors de l'impression du ticket`, `Erreur`);
            this.dialogRef.close(true);
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

  reductionWithLabel(fee: FeeType) {
    if (this.registration.reductions === undefined || this.registration.reductions == null) {
      return 'Pas de réduction';
    }
    const reduction = this.registration.reductions.find(r => r.fee === fee._id);
    if (reduction) {
      if (reduction.reductionType === 'percentage') {
        return `-${this.spaced.transform(reduction.reduction)}% (${this.spaced.transform(reduction.reduction / 100 * fee.amount)} F)`;
      } else {
        return `-${this.spaced.transform(reduction.reduction)}`;
      }
    } else {
      return 'Pas de réduction';
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
      const paymentLine = p.paymentLines.find(line => line.feeId === fee._id);
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

  async reloadFees() {
    this.paymentLines.clear();
    for (const line of this.paymentLines.controls) {
      const oldGroup = line.value;
      const group = this.formBuilder.group({
        fee: oldGroup.fee,
        amount: [oldGroup.amount, [this.validateAmount(this.defaultFee), Validators.min(0)]],
        remaining: this.remainingPayments(oldGroup.fee),
        pastPayments: this.pastPayments(oldGroup.fee),
        reduction: this.reductionWithLabel(oldGroup.fee)
      });
      this.paymentLines.push(group);
    }
  }

  async reductions() {
    await this.utils.common.modal(ReductionsComponent, this.registration);
    this.change.detectChanges();
    this.paymentLineForm.controls.forEach(c => {
      c.updateValueAndValidity();
      c.get('amount').updateValueAndValidity();
    });
  }

  removeFeeToPay(feeIndex: number) {
    const paymentLine = this.paymentLines.at(feeIndex).value;
    this.paymentLines.removeAt(feeIndex);
    this.feesAvailable.unshift(paymentLine.fee);
    this.feeToPay.patchValue(null);
  }

  async pruneFeesAvailable() {
    const classroom = await this.repo.classrooms.one(this.registration.classroom._id);
    const otherFees: FeeType[] = await this.repo.fees.otherPayments();
    this.feesAvailable = this.fees.filter(fee => {
        return fee._id === classroom.registrationFee ||
          fee._id === classroom.reregistrationFee ||
          fee._id === classroom.schoolFee ||
          otherFees.find(f => f._id === fee._id) !== undefined;
      });

    if (this.isRegistration) {
      const registrationIndex = this.feesAvailable.findIndex(fee => fee._id === classroom.registrationFee);
      this.feesAvailable.splice(registrationIndex, 1);
      const reregistrationIndex = this.feesAvailable.findIndex(fee => fee._id === classroom.reregistrationFee);
      this.feesAvailable.splice(reregistrationIndex, 1);
    } else {
      const index = this.feesAvailable.findIndex(fee => fee._id === this.defaultFee._id);
      this.feesAvailable.splice(index, 1);

      if (this.registration.isNewStudent || !this.registration.isReregistration) {
        const reregistrationIndex = this.feesAvailable.findIndex(fee => fee._id === classroom.reregistrationFee);
        this.feesAvailable.splice(reregistrationIndex, 1);
      } else {
        const registrationIndex = this.feesAvailable.findIndex(fee => fee._id === classroom.registrationFee);
        this.feesAvailable.splice(registrationIndex, 1);
      }
    }
  }

  ngOnInit(): void {

    this.repo.classrooms.stream.subscribe(classrooms => this.classrooms = classrooms);

    this.feeTypesRepository.stream.subscribe(fees => {
      this.fees = fees;
      this.pruneFeesAvailable();
    });

    this.feeToPay.valueChanges.subscribe((f: FeeType) => {
      if (f == null) return;

      const group = this.formBuilder.group({
        fee: f,
        amount: [0, this.validateAmount(f)],
        remaining: this.remainingPayments(f),
        pastPayments: this.pastPayments(f),
        reduction: this.reductionWithLabel(f)
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
