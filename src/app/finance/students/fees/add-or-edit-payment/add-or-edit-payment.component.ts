import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Student} from '../../../../core/models/student';
import {SchoolYear} from '../../../../core/models/school-year';
import {FeeType} from '../../../../core/models/fee-type';
import {Classroom} from '../../../../core/models/classroom';
import {ClassroomsRepository} from '../../../../core/repositories/classrooms.repository';
import {StudentsRepository} from '../../../../core/repositories/students.repository';
import {filter, flatMap, map, switchMap} from 'rxjs/operators';
import {FeeTypesRepository} from '../../../../core/repositories/fee-types.repository';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Payment} from '../../../../core/models/payment';
import {Utils} from '../../../../core/shared/utils';
import {PaymentsRepository} from '../../../../core/repositories/payments.repository';
import {SchoolyearsRepository} from '../../../../core/repositories/schoolyears.repository';
import {RegistrationsRepository} from '../../../../core/repositories/registrations.repository';
import {Registration} from '../../../../core/models/registration';
import {debug} from 'util';

@Component({
  selector: 'app-add-or-edit-payment',
  templateUrl: './add-or-edit-payment.component.html',
  styleUrls: ['./add-or-edit-payment.component.scss']
})
export class AddOrEditPaymentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private formBuilder: FormBuilder,
              public classroomsRepository: ClassroomsRepository,
              private studentsRepository: StudentsRepository,
              public feeTypesRepository: FeeTypesRepository,
              public dialogRef: MatDialogRef<AddOrEditPaymentComponent>,
              public utils: Utils,
              private paymentsRepository: PaymentsRepository,
              private schoolyearsRepository: SchoolyearsRepository,
              private registrationsRepository: RegistrationsRepository) {
    this.payment = this.data.payment;
    if (this.payment) {
      this.paymentForm.patchValue(this.payment);
      this.title = 'Modification du payement';
    }
  }

  payments: Payment[] = [];
  schoolYears: SchoolYear[];
  payment: Payment;
  title = 'Nouveau payement';
  classroomSelected = new FormControl();
  students: Student[];
  studentsFiltred: Student[];
  registrations: Registration[] = [];
  paymentForm = this.formBuilder.group({
    _id: [],
    student: [],
    schoolYear: [],
    registrationFee: [],
    schoolFee: [{value: '', disabled: false}],
    fees: [],
    classroom: [],
    reduction: [],
    amount: [0],
    paymentDate: []
  });

  save() {
    if (this.paymentForm.valid) {
      this.payment ? this.edit() : this.create();
      this.utils.common.toast(`Opération réalisée avec succès`);
      this.dialogRef.close();
    } else {
      console.log(this.paymentForm);
      this.utils.common.alert('Il existe des erreurs dans le formulaire');
    }
  }

  async create() {
    const payment: Payment | any = this.paymentForm.value;
    payment.classroom = this.classroomSelected.value;
    payment.fees = [ { fee: payment.schoolFee, amount: Number(payment.amount), reduction: Number(payment.reduction) } ];
    payment.schoolYear = this.schoolYears[0];
    await this.paymentsRepository.add(payment);
  }

  async edit() {
    const payment = this.paymentForm.value;
    await this.paymentsRepository.update(payment, this.payment._id);
  }

  totalSchoolFeeAmount() {
    const feeType: FeeType = this.paymentForm.get('schoolFee').value;
    return feeType.amount;
  }

  currentStudentPayments() {
    if (this.paymentForm.get('student').value == null) { return []; }
    return this.payments.filter(p => {
      if (p.student == null) { return false; }
      return p.student._id === this.paymentForm.get('student').value._id && p.schoolYear._id === this.schoolYears[0]._id;
    });
  }

  studentSchoolFeesPayments() {
    const payments = this.currentStudentPayments();

    const feeType: FeeType = this.paymentForm.get('schoolFee').value;
    return payments.filter(p => {
      try {
        return p.fees.find(f => f.fee._id.toString() === feeType._id.toString()) !== undefined;
      } catch (e) {
        return false;
      }
    });
  }

  studentSchoolFeesPaymentsAmount() {
    const schoolFeesPayments = this.studentSchoolFeesPayments();
    if (schoolFeesPayments.length <= 0) { return 0; }
    return schoolFeesPayments.reduce((acc, cur) => acc + cur.amount, 0);
  }

  ngOnInit() {
    this.classroomSelected.valueChanges
      .subscribe((classroom: Classroom) => {
        this.paymentForm.reset();
        this.studentsFiltred = this.registrations.filter(r => r.classroom._id === classroom._id).map(r => r.student);
        this.paymentForm.get('schoolFee').patchValue(classroom.schoolFee, {emitEvent: true});
      });

    this.studentsRepository.stream
      .subscribe((students: Student[]) => {
        this.students = students;
      });

    this.schoolyearsRepository.stream
      .subscribe(schoolYears => {
        this.schoolYears = schoolYears;
      });

    this.paymentForm.get('schoolFee').valueChanges
      .subscribe((fee: FeeType) => {
        if (fee == null) { return; }
        this.paymentForm.get('amount').setValidators([Validators.max(fee.amount)]);
      });

    this.paymentsRepository.stream
      .subscribe(payments => {
        this.payments = payments;
      });

    this.registrationsRepository.stream
      .subscribe(registrations => {
        this.registrations = registrations;
      });
  }
}
