import {Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {ClassroomsRepository} from '../../core/repositories/classrooms.repository';
import {Router} from '@angular/router';
import {Classroom} from '../../core/models/classroom';
import {StudentsRepository} from '../../core/repositories/students.repository';
import {Utils} from '../../core/shared/utils';
import {RegistrationsRepository} from '../../core/repositories/registrations.repository';
import {Registration} from '../../core/models/registration';
import {Student} from '../../core/models/student';
import {SchoolyearsRepository} from '../../core/repositories/schoolyears.repository';
import {SchoolYear} from '../../core/models/school-year';
import {PaymentsRepository} from '../../core/repositories/payments.repository';
import {Payment} from '../../core/models/payment';
import {SchoolsRepository} from '../../core/repositories/schools.repository';
import {FeeType} from '../../core/models/fee-type';
import {FeeTypesRepository} from '../../core/repositories/fee-types.repository';
import * as moment from 'moment';

const MAX_PAGE = 3;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  subFeesForm = this.formBuilder.array([]);
  paymentForm = this.formBuilder.group({
    _id: [''],
    student: [''],
    schoolYear: [''],
    registrationFee: [''],
    schoolFee: [''],
    fees: this.subFeesForm,
    classroom: [''],
    amount: ['']
  });
  registrationForm = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    birthday: [''],
    birthCity: [''],
    address: [''],
    gender: ['M', Validators.required],
    fathersFirstname: [''],
    fathersLastname: [''],
    mothersFirstname: [''],
    mothersLastname: [''],
    fathersJob: [''],
    mothersJob: [''],
    fathersPhone: [''],
    mothersPhone: [''],
    lastClass: [''],
    lastSchool: [''],
    classroom: [''],
    registrationDate: [moment().format()],
    payment: this.paymentForm
  });
  headers = ['Informations personnelles', 'Informations sur les parents', 'École', 'Contribution'];
  currentPage = 0;
  registrationFee: number;
  firstTermSchoolFee: number;
  feeTypeToAdd = new FormControl();
  classrooms: Classroom[];
  schoolYears: SchoolYear[];
  feeTypes: FeeType[] = [];
  registrations: Registration[] = [];
  isBusy = false;
  registationDateIsDifferent = false;
  studentHasSibling = false;
  siblingClassroom = new FormControl();
  siblingClassroomStudents = [];
  sibling = new FormControl();
  isReady = this.currentPage !== MAX_PAGE ? true : this.registrationForm.valid;

  constructor(private formBuilder: FormBuilder,
              public classroomsRepository: ClassroomsRepository,
              private studentsRepository: StudentsRepository,
              private registrationRepository: RegistrationsRepository,
              private schoolyearsRepository: SchoolyearsRepository,
              private paymentsRepository: PaymentsRepository,
              private schoolsRepository: SchoolsRepository,
              public feeTypesRepository: FeeTypesRepository,
              private router: Router,
              private utils: Utils) {
  }

  get subPayments() {
    return this.subFeesForm as FormArray;
  }

  back() {
    if (!this.registrationForm.valid) {
      this.utils.form.invalidatedForm(this.registrationForm);
      return;
    }

    this.currentPage -= 1;
    if (this.currentPage <= 1) {
      this.registrationForm.get('classroom').clearValidators();
      this.registrationForm.get('classroom').setErrors(null);
    }
  }

  filterFees() {
    return this.feeTypes.filter(ft => {
      const subPaymentAlreadyInForm = this.subPayments.controls.find(subPaymentGroup => {
        console.log(subPaymentGroup.get('fee').value);
        const subPaymentId = subPaymentGroup.get('fee').value._id;
        console.log(subPaymentId);
        return ft._id === subPaymentId;
      });
      return subPaymentAlreadyInForm === undefined;
    });
  }

  getBalance(subpayment) {
    return subpayment.fee.amount - subpayment.amount;
  }

  async save() {
    if (!this.canSave()) { return; }

    this.isBusy = true;
    const newStudents = this.registrationForm.value;
    const student: Student = await this.studentsRepository.add(newStudents);

    const newRegistration: Registration = {
      student,
      classroom: student.classroom,
      schoolYear: this.schoolYears[0],
      registrationDate: newStudents.registrationDate
    };
    await this.registrationRepository.add(newRegistration);

    const newPayment: Payment = this.paymentForm.value;
    newPayment.amount = newPayment.fees.reduce((acc, cur) => acc + cur.amount, 0);
    newPayment.student = student;
    newPayment.paymentDate = newStudents.registrationDate;
    const payment = await this.paymentsRepository.add(newPayment);

    const message = `L'élève ${student.firstname} ${student.lastname} est inscrit avec succès à la classe de ${student.classroom.name}`;
    await this.utils.common.customAlert(message, '', ['Imprimer le reçu']);

    await this.utils.print.registrationReceipt(payment);
    this.resetAllForms();
    this.currentPage = 0;
    this.isBusy = false;
  }

  addPaymentToPaymentsFormArray(payment, subPayment) {
    if (payment) {
      this.paymentForm.reset();
      this.paymentForm.patchValue(payment);
      this.subPayments.push(this.formBuilder.group({
        fee: subPayment.fee,
        amount: [subPayment.amount, [this.utils.form.registrationFeeValidator(subPayment), Validators.min(0)]],
        isRegistration: true
      }));
    } else {
      this.subPayments.push(this.formBuilder.group({
        fee: subPayment.fee,
        amount: [subPayment.amount, [this.utils.form.feeValidator(subPayment), Validators.min(0)]]
      }));
    }
    console.log(payment);
  }

  resetAllForms() {
    this.registrationForm.reset();
    this.registrationForm.markAsUntouched();
    this.paymentForm.reset();
    this.paymentForm.markAsUntouched();
    this.subFeesForm.reset();
    this.subFeesForm.clear();
    this.subFeesForm.markAsUntouched();

    this.registrationForm.get('classroom').setErrors(null);
    this.registrationForm.patchValue({gender: 'M'});
  }

  onClassroomSelected() {
    this.registrationForm.controls.classroom.valueChanges
      .subscribe((obj: Classroom) => {
        if (obj == null) {
          return;
        }
        const classroom = this.classrooms.find(c => c._id === obj._id);
        if (classroom.registrationFee === undefined || classroom.registrationFee === null) {
          this.utils.common.alert(`La classe sélèctionnée n'est pas associée à des frais d'inscription`);
          this.registrationForm.controls.classroom.setValue('', {emitEvent: false});
          return;
        }

        if (classroom.schoolFee === undefined || classroom.schoolFee === null) {
          this.utils.common.alert(`La classe sélèctionnée n'est pas associée à des frais de scolarité`);
          this.registrationForm.controls.classroom.setValue('', {emitEvent: false});
          return;
        }

        if (classroom.schoolFee.tranches === null || classroom.schoolFee.tranches.length <= 0) {
          this.utils.common.alert(`La classe sélèctionnée n'est pas associée à des tranches de scolarité.
          Veuillez vous rendre dans le module Finance afin d'associer des tranches à ce type de contribution.`);
          this.registrationForm.controls.classroom.setValue('', {emitEvent: false});
          return;
        }

        const payment = {
          schoolYear: this.schoolYears[0],
          classroom,
          fees: []
        };
        const subPayment = { fee: classroom.registrationFee, amount: 0 };
        this.addPaymentToPaymentsFormArray(payment, subPayment);

        this.registrationFee = classroom.registrationFee.amount;
        this.firstTermSchoolFee = classroom.schoolFee.tranches[0].amount;
      });
  }

  private canSave() {
    if (!this.registrationForm.valid) {
      this.utils.form.invalidatedForm(this.registrationForm);
      return false;
    }

    if (this.currentPage < MAX_PAGE) {
      this.currentPage++;
      if (this.currentPage === 2) {
        this.registrationForm.get('classroom').setValidators([Validators.required]);
      }
      return false;
    }

    return true;
  }

  ngOnInit() {
    this.classroomsRepository.stream
      .subscribe((classrooms: Classroom[]) => {
        this.classrooms = classrooms;
      });

    this.registrationRepository.stream
      .subscribe((registrations: Registration[]) => {
        this.registrations = registrations;
      });

    this.onClassroomSelected();

    this.schoolyearsRepository.stream
      .subscribe((schoolYears: SchoolYear[]) => {
        this.schoolYears = schoolYears;
      });

    this.feeTypeToAdd.valueChanges
      .subscribe(fee => {
        if (fee == null) { return; }
        const subPayment = { fee, amount: 0, isRegistration: false };
        this.addPaymentToPaymentsFormArray(null, subPayment);
      });

    this.feeTypesRepository.stream.subscribe(feeTypes => {
      this.feeTypes = feeTypes;
    });

    this.siblingClassroom.valueChanges
      .subscribe((classroom: Classroom) => {
        this.siblingClassroomStudents = this.registrationRepository.totalStudentsForClassroom(this.registrations, classroom);
      });

    this.sibling.valueChanges
      .subscribe((student: Student) => {
        this.registrationForm.get('fathersFirstname').setValue(student.fathersFirstname);
        this.registrationForm.get('fathersLastname').setValue(student.fathersLastname);
        this.registrationForm.get('mothersFirstname').setValue(student.mothersFirstname);
        this.registrationForm.get('mothersLastname').setValue(student.mothersLastname);
        this.registrationForm.get('fathersJob').setValue(student.fathersJob);
        this.registrationForm.get('mothersJob').setValue(student.mothersJob);
        this.registrationForm.get('fathersPhone').setValue(student.mothersJob);
        this.registrationForm.get('mothersPhone').setValue(student.mothersJob);
      });
  }
}
