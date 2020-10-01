import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Student} from '../../../core/models/student';
import {SchoolYear} from '../../../core/models/school-year';
import {FeeType} from '../../../core/models/fee-type';
import {Classroom} from '../../../core/models/classroom';
import {ClassroomsRepository} from '../../../core/repositories/classrooms.repository';
import {StudentsRepository} from '../../../core/repositories/students.repository';
import {FeeTypesRepository} from '../../../core/repositories/fee-types.repository';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Payment} from '../../../core/models/payment';
import {Utils} from '../../../core/shared/utils';
import {PaymentsRepository} from '../../../core/repositories/payments.repository';
import {SchoolyearsRepository} from '../../../core/repositories/schoolyears.repository';
import {RegistrationsRepository} from '../../../core/repositories/registrations.repository';
import {Registration} from '../../../core/models/registration';
import * as moment from 'moment';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {

  payments: Payment[] = [];
  feeTypes: FeeType[] = [];
  schoolYears: SchoolYear[];
  payment: Payment;
  title = 'Nouveau payement';
  classroomSelected = new FormControl();
  students: Student[];
  studentsFiltred: Student[];
  registrations: Registration[] = [];
  feeTypeToAdd = new FormControl();
  subFeesForm = this.formBuilder.array([]);
  paymentForm = this.formBuilder.group({
    _id: [],
    student: [],
    schoolYear: [],
    registrationFee: [],
    schoolFee: [{value: '', disabled: false}],
    fees: this.subFeesForm,
    classroom: [],
    reduction: [],
    amount: [0],
    paymentDate: [moment().format()]
  });

  get isReady() {
    return this.classroomSelected.value != null && this.paymentForm.get('student').value != null;
  }

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private formBuilder: FormBuilder,
              public classroomsRepository: ClassroomsRepository,
              private studentsRepository: StudentsRepository,
              public feeTypesRepository: FeeTypesRepository,
              public dialogRef: MatDialogRef<AddPaymentComponent>,
              public utils: Utils,
              private paymentsRepository: PaymentsRepository,
              private schoolyearsRepository: SchoolyearsRepository,
              private registrationsRepository: RegistrationsRepository) {
    this.payment = this.data.payment;
    if (this.payment) {
      // this.initializeUpdatedPayment();
    }
  }

  ngOnInit(): void {
  }

  // get subPayments() {
  //   return this.subFeesForm as FormArray;
  // }
  //
  // initializeUpdatedPayment() {
  //   this.title = 'Modification du payement';
  //   this.studentsFiltred = this.registrations.filter(r => r.classroom._id === this.payment.classroom._id).map(r => r.student);
  //   this.paymentForm.patchValue(this.payment);
  //   this.payment.paymentLines.forEach(f => this.subPayments.push(this.formBuilder.group(f)));
  // }
  //
  // initializeReductions() {
  //   this.subPayments.controls.forEach(c => {
  //     const currentSubPaymentFee = c.get('fee').value;
  //     const reductionObject = this.reductionFromFee(currentSubPaymentFee);
  //     if (c.get('reductionType')) { c.get('reductionType').patchValue(reductionObject.type); }
  //     c.get('reduction').patchValue(reductionObject.reductionAmount);
  //   });
  // }
  //
  // save() {
  //   if (this.paymentForm.valid) {
  //     this.payment ? this.edit() : this.create();
  //     this.utils.common.toast(`Opération réalisée avec succès`);
  //     this.dialogRef.close();
  //   } else {
  //     this.utils.common.alert('Il existe des erreurs dans le formulaire');
  //   }
  // }
  //
  // async create() {
  //   const payment: Payment | any = this.paymentForm.value;
  //   payment.classroom = this.classroomSelected.value;
  //   payment.schoolYear = this.schoolYears[0];
  //   if (payment.paymentDate == null) { payment.paymentDate = moment().format(); }
  //   payment.amount = payment.fees.reduce((acc, cur) => acc + cur.amount, 0);
  //   await this.paymentsRepository.add(payment);
  // }
  //
  // async edit() {
  //   const payment = this.paymentForm.value;
  //   payment.amount = this.subPayments.controls.reduce((acc, cur) =>  {
  //     const amount = cur.get('amount').value;
  //     acc = acc + Number(amount);
  //     return acc;
  //   }, 0);
  //   await this.paymentsRepository.update(payment, this.payment._id);
  //   const currentRegistration = this.utils.student.studentRegistration(this.payment.student);
  //   currentRegistration.reductions = this.subPayments.value;
  //   await this.registrationsRepository.update(currentRegistration, currentRegistration._id);
  // }
  //
  // totalSchoolFeeAmount() {
  //   const feeType: FeeType = this.paymentForm.get('schoolFee').value;
  //   return feeType.amount;
  // }
  //
  // currentStudentPayments() {
  //   if (this.paymentForm.get('student').value == null) {
  //     return [];
  //   }
  //   return this.payments.filter(p => {
  //     if (p.student == null) {
  //       return false;
  //     }
  //     return p.student._id === this.paymentForm.get('student').value._id && p.schoolYear._id === this.schoolYears[0]._id;
  //   });
  // }
  //
  // removeSubpayment(index: number) {
  //   this.subPayments.removeAt(index);
  //
  // }
  //
  // onReductionTypeChanged(subPayment) {
  //   const currentReductionType = subPayment.get('reductionType').value;
  //   if (currentReductionType === 'percentage') {
  //     subPayment.get('reductionType').patchValue('amount');
  //   } else {
  //     subPayment.get('reductionType').patchValue('percentage');
  //     subPayment.get('reduction').setValidators([Validators.min(0), Validators.max(100)]);
  //   }
  //   subPayment.get('reduction').patchValue(0);
  // }
  //
  // studentSchoolFeesPayments() {
  //   const payments = this.currentStudentPayments();
  //
  //   const feeType: FeeType = this.paymentForm.get('schoolFee').value;
  //   return payments.filter(p => {
  //     try {
  //       return p.paymentLines.find(f => f.fee._id.toString() === feeType._id.toString()) !== undefined;
  //     } catch (e) {
  //       return false;
  //     }
  //   });
  // }
  //
  // oldPayments(subPayment) {
  //   return this.utils.student.studentPaymentsForFee(subPayment.fee, this.paymentForm.get('student').value, this.payments);
  // }
  //
  // studentSchoolFeesPaymentsAmount() {
  //   const schoolFeesPayments = this.studentSchoolFeesPayments();
  //   if (schoolFeesPayments.length <= 0) {
  //     return 0;
  //   }
  //   return schoolFeesPayments.reduce((acc, cur) => acc + cur.amount, 0);
  // }
  //
  // reductionFromFee(fee: FeeType) {
  //   const student = this.paymentForm.get('student').value;
  //   if (student == null) {
  //     return {type: 'amount', reductionAmount: 0};
  //   }
  //   const currentStudentRegistration = this.utils.student.studentRegistration(student);
  //   const reductions = currentStudentRegistration.reductions;
  //   const feeReduction = reductions.find(r => r.fee._id === fee._id);
  //
  //   if (feeReduction === undefined) {
  //     return {type: 'amount', reductionAmount: 0};
  //   } else {
  //     return {type: feeReduction.reductionType, reductionAmount: feeReduction.reduction};
  //   }
  // }
  //
  // addSubPayment(subPayment) {
  //   const reductionObject = this.reductionFromFee(subPayment.fee);
  //   this.subPayments.push(this.formBuilder.group({
  //     fee: subPayment.fee,
  //     amount: [subPayment.amount, [this.utils.form.registrationFeeValidator(subPayment), Validators.min(0)]],
  //     reduction: reductionObject.reductionAmount,
  //     reductionType: reductionObject.type
  //   }));
  // }
  //
  // onClassroomChanged() {
  //   this.classroomSelected.valueChanges
  //     .subscribe((classroom: Classroom) => {
  //       this.paymentForm.reset();
  //       this.subPayments.clear();
  //       this.studentsFiltred = this.utils.student.classroomStudents(classroom);
  //       this.paymentForm.get('schoolFee').patchValue(classroom.schoolFee, {emitEvent: true});
  //     });
  // }
  //
  // onStudentChanged() {
  //   this.paymentForm.get('student').valueChanges
  //     .subscribe((student: Student) => {
  //       if (student === undefined || student == null) {
  //         this.subPayments.clear();
  //         return;
  //       }
  //       this.subPayments.clear();
  //       const registration = this.utils.student.studentRegistration(student);
  //       const schoolFee = registration.classroom.schoolFee;
  //
  //       const subPayment = {fee: schoolFee, amount: 0};
  //       this.addSubPayment(subPayment);
  //     });
  // }
  //
  // filterFees() {
  //   return this.feeTypes.filter(ft => {
  //     const subPaymentAlreadyInForm = this.subPayments.controls.find(subPaymentGroup => {
  //       if (subPaymentGroup.get('fee').value == null) {
  //         return false;
  //       }
  //       const subPaymentId = subPaymentGroup.get('fee').value._id;
  //       return ft._id === subPaymentId;
  //     });
  //     return subPaymentAlreadyInForm === undefined;
  //   });
  // }
  //
  // onFeeTypeAdded() {
  //   this.feeTypeToAdd.valueChanges
  //     .subscribe(fee => {
  //       if (fee == null) {
  //         return;
  //       }
  //       const subPayment = {fee, amount: 0};
  //       this.addSubPayment(subPayment);
  //     });
  // }
  //
  // checkReduction(subPayment) {
  //   if (subPayment.get('fee').value == null) { return; }
  //   const fee = subPayment.get('fee').value.amount;
  //   const payed = subPayment.get('amount').value;
  //   const rawReduction = subPayment.get('reduction') ? subPayment.get('reduction').value : 0;
  //   const reductionType = subPayment.get('reductionType') ? subPayment.get('reductionType').value : 'amount';
  //   let reduction = 0;
  //
  //   if (reductionType === 'percentage') {
  //     reduction = Number(fee) * Number(rawReduction) / 100;
  //   } else {
  //     reduction = Number(rawReduction);
  //   }
  //   return Number(payed) + reduction > Number(fee);
  // }
  //
  // currentOldSubPayment(index) {
  //   return this.payment.paymentLines[index];
  // }
  //
  // getBalance(subpayment) {
  //   const currentStudentSelected = this.paymentForm.get('student').value;
  //   const amountPaying = subpayment.amount;
  //   const reduction = this.utils.student.studentReductionsForFee(subpayment.fee, currentStudentSelected);
  //   return subpayment.fee.amount - this.oldPayments(subpayment) - reduction - Number(amountPaying);
  // }
  //
  // getBalanceOnUpdate(subpayment, index) {
  //   const currentStudentSelected = this.paymentForm.get('student').value;
  //   const amountPaying = subpayment.amount;
  //   const reduction = this.utils.student.studentReductionsForFee(subpayment.fee, currentStudentSelected);
  //   return subpayment.fee.amount + this.currentOldSubPayment(index).amount - this.oldPayments(subpayment) - reduction - Number(amountPaying);
  // }
  //
  // ngOnInit() {
  //   this.onClassroomChanged();
  //   this.onStudentChanged();
  //   this.onFeeTypeAdded();
  //
  //   this.studentsRepository.stream.subscribe((students: Student[]) => this.students = students);
  //   this.schoolyearsRepository.stream.subscribe(schoolYears => this.schoolYears = schoolYears);
  //   this.feeTypesRepository.stream.subscribe(feeTypes => this.feeTypes = feeTypes);
  //   this.paymentsRepository.stream.subscribe(payments => this.payments = payments);
  //
  //   this.paymentForm.get('schoolFee').valueChanges
  //     .subscribe((fee: FeeType) => {
  //       if (fee == null) {
  //         return;
  //       }
  //       this.paymentForm.get('amount').setValidators([Validators.max(fee.amount)]);
  //     });
  //
  //   this.registrationsRepository.stream
  //     .subscribe(registrations => {
  //       this.registrations = registrations;
  //
  //       this.initializeReductions();
  //     });
  //
  // }
}
