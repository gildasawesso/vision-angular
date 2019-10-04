import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClassroomsRepository} from '../../repositories/classrooms.repository';
import {Router} from '@angular/router';
import {Classroom} from '../../models/classroom';
import {StudentsRepository} from '../../repositories/students.repository';
import {Utils} from '../../shared/utils';
import {RegistrationsRepository} from '../../repositories/registrations.repository';
import {Registration} from '../../models/registration';
import {Student} from '../../models/student';
import {SchoolyearsRepository} from '../../repositories/schoolyears.repository';
import {SchoolYear} from '../../models/school-year';
import {PaymentsRepository} from '../../repositories/payments.repository';
import {Payment} from '../../models/payment';
import {School} from '../../models/school';
import {SchoolsRepository} from '../../repositories/schools.repository';
import {sample} from 'rxjs/operators';
import {FeeType} from '../../models/fee-type';
import {FeeTypesRepository} from '../../repositories/fee-types.repository';

const MAX_PAGE = 3;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

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
    payment: this.paymentForm
  });

  headers = ['Informations personnelles', 'Informations sur les parents', 'École', 'Contribution'];
  currentPage = 0;
  userRole = 'account';
  registrationFee: number;
  firstTermSchoolFee: number;
  amountPayed = new FormControl();
  feeTypeToAdd = new FormControl();
  amountPayedOldValue: number;
  classrooms: Classroom[];
  schoolYears: SchoolYear[];
  feeTypes: FeeType[] = [];
  feeTypesFiltred: FeeType[] = [];
  isBusy = false;
  isReady = true;

  log(x) {
    console.log(x);
  }

  async print() {
    await this.utils.print.registrationReceipt({});
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
        const subPaymentId = subPaymentGroup.get('fee').value._id;
        return ft._id === subPaymentId;
      });
      return subPaymentAlreadyInForm === undefined;
    });
  }

  getBalance() {
    if (this.firstTermSchoolFee) {
      return (this.registrationFee + this.firstTermSchoolFee) - this.amountPayed.value;
    }
  }

  async save() {
    if (!this.registrationForm.valid) {
      this.utils.form.invalidatedForm(this.registrationForm);
      return;
    }

    if (this.currentPage < MAX_PAGE) {
      this.currentPage++;
      if (this.currentPage === 2) {
        this.registrationForm.get('classroom').setValidators([Validators.required]);
      }
      return;
    }

    this.isBusy = true;
    const newStudents = this.registrationForm.value;
    const student: Student = await this.studentsRepository.add(newStudents);

    const newRegistration: Registration = {
      student,
      classroom: student.classroom,
      schoolYear: this.schoolYears[0]
    };
    await this.registrationRepository.add(newRegistration);

    const newPayment: Payment = this.paymentForm.value;
    newPayment.amount = newPayment.fees.reduce((acc, cur) => acc + cur.amount, 0);
    newPayment.student = student;
    const payment = await this.paymentsRepository.add(newPayment);
    this.isBusy = false;
    const message = `L'élève ${student.firstname} ${student.lastname} est inscrit avec succès à la classe de ${student.classroom.name}`;
    await this.utils.common.customAlert(message, '', ['Imprimer le reçu']);

    await this.utils.print.registrationReceipt(payment);
    this.resetAllForms();
    this.currentPage = 0;
  }

  addPaymentToPaymentsFormArray(payment, subPayment) {
    if (payment) {
      this.paymentForm.reset();
      this.paymentForm.patchValue(payment);
      this.subPayments.push(this.formBuilder.group({
        fee: subPayment.fee,
        amount: [subPayment.amount, this.utils.form.registrationFeeValidator(subPayment)]
      }));
    } else {
      this.subPayments.push(this.formBuilder.group({
        fee: subPayment.fee,
        amount: [subPayment.amount, this.utils.form.feeValidator(subPayment)]
      }));
    }
  }

  resetAllForms() {
    this.registrationForm.reset();
    this.registrationForm.markAsUntouched();
    this.paymentForm.reset();
    this.paymentForm.markAsUntouched();
    this.subFeesForm.reset();
    this.subFeesForm.clear();
    this.subFeesForm.markAsUntouched();

    console.log(this.registrationForm.value);

    this.registrationForm.get('classroom').setErrors(null);
  }

  ngOnInit() {
    this.classroomsRepository.stream
      .subscribe((classrooms: Classroom[]) => {
        this.classrooms = classrooms;
      });

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

    this.schoolyearsRepository.stream
      .subscribe((schoolYears: SchoolYear[]) => {
        this.schoolYears = schoolYears;
      });

    this.feeTypeToAdd.valueChanges
      .subscribe(fee => {
        if (fee == null) { return; }
        const subPayment = { fee, amount: 0 };
        console.log('fantome');
        this.addPaymentToPaymentsFormArray(null, subPayment);
      });

    this.feeTypesRepository.stream.subscribe(feeTypes => {
      this.feeTypes = feeTypes;
    });
  }
}
