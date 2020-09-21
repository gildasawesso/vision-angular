import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {School} from '../../../../core/models/school';
import {SchoolSession} from '../../../../core/models/school-session';
import {SchoolYear} from '../../../../core/models/school-year';
import {Utils} from '../../../../core/shared/utils';
import {SchoolyearsRepository} from '../../../../core/repositories/schoolyears.repository';
import {Router} from '@angular/router';
import {AuthService} from '../../../../core/services/auth.service';
import {PermissionsService} from '../../../../core/services/permissions.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-or-edit-school-year',
  templateUrl: './add-or-edit-school-year.component.html',
  styleUrls: ['./add-or-edit-school-year.component.scss']
})
export class AddOrEditSchoolYearComponent implements OnInit {

  schoolYear: SchoolYear;

  schoolYearSessionForm = this.formBuilder.group({
    name: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });

  schoolYearForm = this.formBuilder.group({
    _id: [null],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    sessions: this.formBuilder.array([]),
    school: School,
  });

  get sessions() {
    return this.schoolYearForm.controls.sessions as FormArray;
  }

  isBusy = false;

  constructor(private formBuilder: FormBuilder,
              private utils: Utils,
              private schoolyearsRepository: SchoolyearsRepository,
              private router: Router,
              private auth: AuthService,
              private permissions: PermissionsService,
              @Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<AddOrEditSchoolYearComponent>) {
    this.schoolYear = this.data;
    if (this.schoolYear) {
      this.schoolYear.sessions.forEach(session => {
        const group = this.formBuilder.group(session);
        this.sessions.push(group);
      });
      this.schoolYearForm.patchValue(this.schoolYear);
    }
  }

  addSession() {
    if (this.utils.form.isValid(this.schoolYearSessionForm)) {
      const group = this.formBuilder.group(new SchoolSession());
      group.patchValue(this.schoolYearSessionForm.value);
      this.sessions.push(group);
      this.schoolYearSessionForm.reset();
    }
  }

  removeSession(index: number) {
    this.sessions.removeAt(index);
  }

  async save() {
    this.isBusy = true;
    if (this.utils.form.isValid(this.schoolYearForm)) {
      if (this.sessions.length < 2) {
        this.utils.common.alert('Vous devez ajouter au moins 2 sessions ou trimestres');
        return;
      }

      if (this.schoolYear) {
        await this.edit();
      } else {
        await this.add();
      }
    }
    this.isBusy = false;
  }

  async add() {
    const newSchoolYear: SchoolYear = this.schoolYearForm.value;
    newSchoolYear.school = this.auth.currentUser.schools[0];
    await this.schoolyearsRepository.add(newSchoolYear);
    this.isBusy = false;
    this.dialogRef.close();
  }

  async edit() {
    const newSchoolYear: SchoolYear = this.schoolYearForm.value;
    await this.schoolyearsRepository.update(newSchoolYear, this.schoolYear._id);
    this.isBusy = false;
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
