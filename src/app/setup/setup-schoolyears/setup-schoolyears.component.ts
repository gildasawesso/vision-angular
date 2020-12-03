import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Utils} from '../../core/shared/utils';
import {Router} from '@angular/router';
import {SchoolSession} from '../../core/models/school-session';
import {School} from '../../core/models/school';
import {SchoolyearsRepository} from '../../core/repositories/schoolyears.repository';
import {AuthService} from '../../core/services/auth.service';
import {SchoolYear} from '../../core/models/school-year';
import {PermissionsService} from '../../core/services/permissions.service';

@Component({
  selector: 'app-setup-schoolyears',
  templateUrl: './setup-schoolyears.component.html',
  styleUrls: ['./setup-schoolyears.component.scss']
})
export class SetupSchoolyearsComponent implements OnInit {

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
              private permissions: PermissionsService) {
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
      const newSchoolYear: SchoolYear = this.schoolYearForm.value;
      newSchoolYear.school = this.auth.snapshot.schools[0];
      await this.schoolyearsRepository.add(newSchoolYear);
      await this.permissions.loadPermissions();
      await this.router.navigateByUrl('');
      this.isBusy = false;
    }
    this.isBusy = false;
  }

  ngOnInit() {
  }

}
