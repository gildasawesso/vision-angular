import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, Validators} from '@angular/forms';
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
import {SchoolsRepository} from '../../core/repositories/schools.repository';
import {FeeTypesRepository} from '../../core/repositories/fee-types.repository';
import * as moment from 'moment';
import {AuthService} from '../../core/services/auth.service';
import {SchoolYearService} from '../../core/services/school-year.service';
import {PayComponent} from '../pay/pay.component';

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
    registrationDate: [moment().format()]
  });
  feeTypeToAdd = new FormControl();
  siblingClassroom = new FormControl();
  sibling = new FormControl();
  schoolYear: SchoolYear;

  registrationFee: number;
  classrooms: Classroom[];
  registrations: Registration[] = [];
  isBusy = false;
  registrationDateIsDifferent = false;
  isReregistration = false;
  studentHasSibling = false;
  siblingClassroomStudents = [];

  constructor(private formBuilder: FormBuilder,
              public classroomsRepository: ClassroomsRepository,
              private studentsRepository: StudentsRepository,
              private registrationRepository: RegistrationsRepository,
              private schoolyearsRepository: SchoolyearsRepository,
              private paymentsRepository: PaymentsRepository,
              private schoolsRepository: SchoolsRepository,
              public feeTypesRepository: FeeTypesRepository,
              private router: Router,
              private utils: Utils,
              private authService: AuthService,
              private schoolYearService: SchoolYearService) {
  }

  async save() {
    if (!this.canSave()) { return; }

    this.isBusy = true;
    const user = await this.authService.getCurrentUser();
    const form = this.registrationForm.value;
    const student: Student = await this.studentsRepository.add(this.createStudent());
    const classroom = form.classroom as Classroom;

    const registrationLike: Registration = {
      student,
      classroom,
      school: user.schools[0],
      schoolYear: this.schoolYear,
      registrationDate: form.registrationDate,
      isReregistration: this.isReregistration,
      isNewStudent: !this.isReregistration,
      reductions: []
    };

    const defaultFeeId = this.isReregistration ? classroom.reregistrationFee : classroom.registrationFee;
    const defaultFee = await this.feeTypesRepository.one(defaultFeeId);
    await this.utils.common.modal(PayComponent, {
      registration: registrationLike,
      defaultFee
    });
    this.resetAllForms();
  }

  resetAllForms() {
    location.reload();
  }

  onClassroomSelected() {
    this.registrationForm.controls.classroom.valueChanges
      .subscribe(async (obj: Classroom) => {
        if (obj == null) {
          return;
        }
        console.log(obj);

        const classroom = this.classrooms.find(c => c._id === obj._id);
        if (classroom.registrationFee === undefined || classroom.registrationFee === null) {
          this.utils.common.alert(`La classe sélèctionnée n'est pas associée à des frais d'inscription`);
          this.registrationForm.controls.classroom.setValue('', {emitEvent: false});
          return;
        }

        if (classroom.reregistrationFee === undefined || classroom.reregistrationFee === null) {
          this.utils.common.alert(`La classe sélèctionnée n'est pas associée à des frais de réinscription`);
          this.registrationForm.controls.classroom.setValue('', {emitEvent: false});
          return;
        }

        if (classroom.schoolFee === undefined || classroom.schoolFee === null) {
          this.utils.common.alert(`La classe sélèctionnée n'est pas associée à des frais de scolarité`);
          this.registrationForm.controls.classroom.setValue('', {emitEvent: false});
          return;
        }

        const schoolFee = await this.feeTypesRepository.one(classroom.schoolFee as string);
        if (schoolFee.tranches === null || schoolFee.tranches === undefined || schoolFee.tranches.length <= 0) {
          this.utils.common.alert(`La classe sélèctionnée n'est pas associée à des tranches de scolarité.
          Veuillez vous rendre dans le module Finance afin d'associer des tranches à ce type de contribution.`);
          this.registrationForm.controls.classroom.setValue('', {emitEvent: false});
          return;
        }
      });
  }

  private canSave() {
    if (!this.registrationForm.valid) {
      this.utils.form.invalidatedForm(this.registrationForm);
      return false;
    }
    return true;
  }

  createStudent(): Student {
    const form = this.registrationForm.value;
    return {
      firstname: form.firstname,
      lastname: form.lastname,
      birthday: form.birthday,
      matricule: form.matricule,
      gender: form.gender,
      status: form.status,
      birthCity: form.birthCity,
      fathersFirstname: form.fathersFirstname,
      fathersLastname: form.fathersLastname,
      mothersFirstname: form.mothersFirstname,
      mothersLastname: form.mothersLastname,
      fathersJob: form.fathersJob,
      mothersJob: form.mothersJob,
      fathersPhone: form.fathersPhone,
      mothersPhone: form.mothersPhone,
      address: form.address,
      lastClass: form.lastClass,
      lastSchool: form.lastSchool
    };
  }

  ngOnInit() {

    this.schoolYearService.schoolYear.subscribe(sy => this.schoolYear = sy);

    this.classroomsRepository.stream
      .subscribe((classrooms: Classroom[]) => {
        this.classrooms = classrooms;
      });

    this.registrationRepository.stream
      .subscribe((registrations: Registration[]) => {
        this.registrations = [...registrations];
      });

    this.onClassroomSelected();

    // todo fixe here
    // this.siblingClassroom.valueChanges
    //   .subscribe((classroom: Classroom) => {
    //     this.siblingClassroomStudents = this.registrationRepository.studentsForClassroom(this.registrations, classroom);
    //   });

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
