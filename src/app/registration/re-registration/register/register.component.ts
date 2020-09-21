import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ClassroomsRepository} from '../../../core/repositories/classrooms.repository';
import {Classroom} from '../../../core/models/classroom';
import {FormControl, Validators} from '@angular/forms';
import {SchoolyearsRepository} from '../../../core/repositories/schoolyears.repository';
import {SchoolYear} from '../../../core/models/school-year';
import * as moment from 'moment';
import {Utils} from '../../../core/shared/utils';
import {Registration} from '../../../core/models/registration';
import {RegistrationsRepository} from '../../../core/repositories/registrations.repository';
import {PayComponent} from '../../pay/pay.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  classrooms: Classroom[];
  schoolsYears: SchoolYear[];
  currentSchoolYear: SchoolYear;
  oldRegistration: Registration;

  newClassroom = new FormControl('', Validators.required);
  registrationDate = new FormControl(moment(), Validators.required);

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<RegisterComponent>,
              private classroomsRepository: ClassroomsRepository,
              private schoolyearsRepository: SchoolyearsRepository,
              private registrationsRepository: RegistrationsRepository,
              private utils: Utils) {
    this.oldRegistration = this.data;
  }

  async register() {
    if (this.isRegistrationInCurrentSchoolYear()) {
      const registrationLike = new Registration();
      registrationLike.classroom = this.newClassroom.value;
      registrationLike.isReregistration = true;
      registrationLike.isNewStudent = false;
      registrationLike.schoolYear = this.currentSchoolYear;
      registrationLike.student = this.oldRegistration.student;
      registrationLike.registrationDate = this.registrationDate.value;
      registrationLike.reductions = [];

      const canClose = await this.utils.common.modal(PayComponent, {
        defaultFee: registrationLike.classroom.reregistrationFee,
        registration: registrationLike
      }, true);

      if (canClose) {
        this.dialogRef.close();
      }
    } else {
      this.utils.common.toast(`Vous devez réaliser l'inscription au cours de l'année scolaire sélectionnée`);
    }
  }

  ngOnInit(): void {
    this.classroomsRepository.stream.subscribe(classrooms => this.classrooms = classrooms);
    this.schoolyearsRepository.stream.subscribe(sy => this.schoolsYears = sy);
    this.schoolyearsRepository.selectedSchoolYear.subscribe(sySelected => this.currentSchoolYear = sySelected);
  }

  isRegistrationInCurrentSchoolYear() {
    const start = moment(this.currentSchoolYear.startDate);
    const end = moment(this.currentSchoolYear.endDate);
    return moment(this.registrationDate.value).isBetween(start, end, null, '[]');
  }

}
