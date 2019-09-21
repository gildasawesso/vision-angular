import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ClassroomsRepository} from '../../core/repositories/classrooms.repository';
import {Router} from '@angular/router';
import {Classroom} from '../../models/classroom';
import {StudentsRepository} from '../../core/repositories/students.repository';
import {Utils} from '../../shared/utils';
import {RegistrationsRepository} from '../../core/repositories/registrations.repository';
import {Registration} from '../../models/registration';
import {Student} from '../../models/student';
import {SchoolyearsRepository} from '../../core/repositories/schoolyears.repository';
import {SchoolYear} from '../../models/school-year';
import {PaymentRepository} from '../../core/repositories/payments.repository';
import {Payment} from '../../models/payment';
import {School} from '../../models/school';
import {SchoolsRepository} from '../../core/repositories/schools.repository';

const MAX_PAGE = 3;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    birthday: [''],
    birthCity: [''],
    address: [''],
    gender: ['M'],
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
    classroom: ['']
  });

  headers = ['Informations personnelles', 'Informations sur les parents', 'École', 'Contribution'];
  currentPage = 0;
  userRole = 'account';
  registrationFee: number;
  firstTermSchoolFee: number;
  amountPayed = new FormControl();
  amountPayedOldValue: number;
  classrooms: Classroom[];
  schoolYears: SchoolYear[];
  isBusy = false;
  isReady = true;

  constructor(private formBuilder: FormBuilder,
              public classroomsRepository: ClassroomsRepository,
              private studentsRepository: StudentsRepository,
              private registrationRepository: RegistrationsRepository,
              private schoolyearsRepository: SchoolyearsRepository,
              private contributionsRepository: PaymentRepository,
              private schoolsRepository: SchoolsRepository,
              private router: Router,
              private utils: Utils) { }

  back() {
    this.currentPage -= 1;
    if (this.currentPage <= 1) {
      this.registrationForm.get('classroom').clearValidators();
      this.registrationForm.get('classroom').setErrors(null);
    }
  }

  onAmountPayedChanged(value) {
    console.log(this.amountPayedOldValue);
    if (Number(value) > this.registrationFee + this.firstTermSchoolFee) {
      this.amountPayed.setValue(this.amountPayedOldValue, {emitModelToViewChange: true});
      this.utils.common.toast('Le montant saisi est supérieur aux frais de scolarité et d\'inscription');
    } else {
      this.amountPayedOldValue = Number(value);
    }
  }

  getBalance() {
    if (this.firstTermSchoolFee) {
      return (this.registrationFee + this.firstTermSchoolFee) - this.amountPayed.value;
    }
  }

  async save() {
    console.log(this.registrationForm);
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
    const students = this.registrationForm.value;
    const newStudent: Student = await this.studentsRepository.add(students);

    const registering: Registration = {
      student: newStudent,
      classroom: newStudent.classroom,
      schoolYear: this.schoolYears[0]
    };
    await this.registrationRepository.add(registering);

    const contributing: Payment = {
      student: newStudent,
      schooYear: this.schoolYears[0],
      fee: newStudent.classroom.registrationFee,
      amount: this.amountPayed.value
    };
    await this.contributionsRepository.add(contributing);
    this.isBusy = false;
    const message = `L'élève ${newStudent.firstname}${newStudent.lastname} est inscrit avec succès à la classe de ${newStudent.classroom.name}`;
    await this.utils.common.customAlert(message, '', ['Imprimer le reçu']);
    this.utils.print.receipt(contributing);
    this.registrationForm.reset();
    this.currentPage = 0;
  }

  validateAmountPayed(c: FormControl) {
    const valid = Number(this.amountPayed.value) <= this.firstTermSchoolFee + this.registrationFee;
    return valid ? null : 'Le montant saisi est incorrect';
  }

  ngOnInit() {
    this.classroomsRepository.stream
      .subscribe((classrooms: Classroom[]) => {
        this.classrooms = classrooms;
      });

    this.registrationForm.controls.classroom.valueChanges
      .subscribe((obj: Classroom) => {
        const classroom = this.classrooms.find(c => c._id === obj._id);
        if (classroom.registrationFee === undefined || classroom.registrationFee === null ) {
          this.utils.common.alert(`La classe sélèctionnée n'est pas associée à des frais d'inscription`);
          this.registrationForm.controls.classroom.setValue('', { emitEvent: false });
          return;
        }

        if (classroom.schoolFee === undefined || classroom.schoolFee === null ) {
          this.utils.common.alert(`La classe sélèctionnée n'est pas associée à des frais de scolarité`);
          this.registrationForm.controls.classroom.setValue('', { emitEvent: false });
          return;
        }

        if (classroom.schoolFee.tranches === null || classroom.schoolFee.tranches.length <= 0) {
          this.utils.common.alert(`La classe sélèctionnée n'est pas associée à des tranches de scolarité.
          Veuillez vous rendre dans le module Finance afin d'associer des tranches à ce type de contribution.`);
          this.registrationForm.controls.classroom.setValue('', { emitEvent: false });
          return;
        }
        this.registrationFee = classroom.registrationFee.amount;
        this.firstTermSchoolFee = classroom.schoolFee.tranches[0].amount;
      });

    this.schoolyearsRepository.stream
      .subscribe((schoolYears: SchoolYear[]) => {
        this.schoolYears = schoolYears;
      });
  }

}

export const sampleRegistration: any = {
  _id: '5d82b523e3efe62fa585bd0f',
  student: {
    _id: '5d82b523e3efe62fa585bd0d',
    dropOut: false,
    firstname: 'fsefsef',
    lastname: 'fsfsef',
    birthday: '1994-02-10T00:00:00.000Z',
    birthCity: 'fsfsfsf',
    address: '',
    gender: 'M',
    fathersFirstname: 'fesfe',
    fathersLastname: 'fsefsef',
    mothersFirstname: 'fsfs',
    mothersLastname: 'efs',
    fathersJob: '2019-09-06',
    mothersJob: '2019-08-31',
    fathersPhone: '322323',
    mothersPhone: '323232',
    lastClass: 'fsefsfs',
    lastSchool: 'fesfsf',
    classroom: '5d7c526e046a831657964d00',
    __v: 0
  },
  schooYear: {
    _id: '5d7967f76e4cbb1842452026',
    startDate: '2019-09-11T15:08:40.206Z',
    endDate: '2020-07-11T15:08:40.206Z',
    school: '5d790df89e9b0e10912878d2',
    updatedAt: '2019-09-11T21:32:39.706Z',
    createdAt: '2019-09-11T21:32:39.706Z',
    __v: 0
  },
  fee: {
    _id: '5d7e3607dfb64238feb88af7',
    name: 'fesfsf',
    amount: 4333,
    deadline: '2019-09-07T00:00:00.000Z',
    isSchoolFee: true,
    tranches: [],
    feeType: '5d7c50af20b7d715f236c6bd',
    __v: 0
  },
  amount: 4333,
  __v: 0
};
