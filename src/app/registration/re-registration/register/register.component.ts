import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
import {SchoolYearService} from '../../../core/services/school-year.service';
import {Repositories} from '../../../core/repositories/repositories';
import {AuthService} from '../../../core/services/auth.service';

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
              private schoolYearService: SchoolYearService,
              private repo: Repositories,
              private utils: Utils,
              private auth: AuthService) {
    this.oldRegistration = this.data;
  }

  async register() {
    if (this.isRegistrationInCurrentSchoolYear()) {

      const registrationLike: Registration = {
        classroom: this.newClassroom.value,
        isReregistration: true,
        isNewStudent: false,
        schoolYear: this.currentSchoolYear,
        student: this.oldRegistration.student,
        registrationDate: this.registrationDate.value,
        reductions: [],
        school: this.auth.currentUser.schools[0]
      };

      const defaultFee = await this.repo.fees.one(registrationLike.classroom.reregistrationFee);
      const canClose = await this.utils.common.modal(PayComponent, {
        defaultFee,
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
    this.schoolYearService.schoolYear.subscribe(sySelected => this.currentSchoolYear = sySelected);
  }

  isRegistrationInCurrentSchoolYear() {
    const start = moment(this.currentSchoolYear.startDate);
    const end = moment(this.currentSchoolYear.endDate);
    return moment(this.registrationDate.value).isBetween(start, end, null, '[]');
  }

}
