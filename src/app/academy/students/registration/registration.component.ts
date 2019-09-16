import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {ClassroomsRepository} from '../../../core/repositories/classrooms.repository';
import {Router} from '@angular/router';
import {Classroom} from '../../../models/classroom';
import {StudentsRepository} from '../../../core/repositories/students.repository';
import {MatDialog} from '@angular/material';
import {Utils} from '../../../shared/utils';
import {RegistrationsRepository} from '../../../core/repositories/registrations.repository';
import {Registration} from '../../../models/registration';
import {Student} from '../../../models/student';
import {SchoolyearsRepository} from '../../../core/repositories/schoolyears.repository';
import {SchoolYear} from '../../../models/school-year';
import {PaymentRepository} from '../../../core/repositories/payments.repository';
import {Payment} from '../../../models/payment';

const MAX_PAGE = 3;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm = this.formBuilder.group({
    firstname: ['fesf'],
    lastname: ['fesf'],
    birthday: [''],
    birthCity: ['fesf'],
    address: ['fsefse'],
    gender: ['M'],
    fathersFirstname: ['fesf'],
    fathersLastname: ['fsefse'],
    mothersFirstname: ['fsef'],
    mothersLastname: ['fsef'],
    fathersJob: ['fsefs'],
    mothersJob: ['fesf'],
    fathersPhone: ['3829320232'],
    mothersPhone: ['32323232322'],
    lastClass: ['4eme'],
    lastSchool: ['IAI'],
    classroom: ['']
  });

  headers = ['Informations personnelles', 'Informations sur les parents', 'École', 'Contribution'];
  currentPage = 0;
  userRole = 'account';
  registrationFee: number;
  amountPayed = new FormControl(10000);
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
              private router: Router,
              private utils: Utils) { }

  async save() {
    if (this.currentPage < MAX_PAGE) {
      this.currentPage++;
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
    this.utils.common.toast(`L'élève ${newStudent.firstname} ${newStudent.lastname} est inscrit avec succès à la classe de ${newStudent.classroom.name}`);
    await this.router.navigateByUrl('/finance/students/payments');
  }

  ngOnInit() {
    this.classroomsRepository.stream
      .subscribe((classrooms: Classroom[]) => {
        this.classrooms = classrooms;
      });

    this.registrationForm.controls.classroom.valueChanges
      .subscribe((value: string) => {
        console.log('value changed', value);
        const classroom = this.classrooms.find(c => c._id === value);
        console.log(this.classrooms);
        console.log(classroom);
        if (classroom.registrationFee === undefined || classroom.registrationFee === null ) {
          this.utils.common.alert(`La classe sélèctionnée n'est pas associée à des frais d'inscription`);
          this.registrationForm.controls.classroom.setValue('', { emitEvent: false });
          return;
        }
        this.registrationFee = classroom.registrationFee.amount;
      });

    this.schoolyearsRepository.stream
      .subscribe((schoolYears: SchoolYear[]) => {
        this.schoolYears = schoolYears;
      });
  }

}
