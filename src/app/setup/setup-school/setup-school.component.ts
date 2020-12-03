import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {School} from '../../core/models/school';
import {Utils} from '../../core/shared/utils';
import {SchoolsRepository} from '../../core/repositories/schools.repository';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {User} from '../../core/models/user';

@Component({
  selector: 'app-setup-school',
  templateUrl: './setup-school.component.html',
  styleUrls: ['./setup-school.component.scss']
})
export class SetupSchoolComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private utils: Utils,
              private schoolsRepository: SchoolsRepository,
              private router: Router,
              private auth: AuthService) { }

  schoolForm = this.formBuilder.group({
    _id: [null],
    name: ['', Validators.required],
    zipCode: [''],
    phones: [''],
    mobile: [''],
    address: ['', Validators.required],
    phone: [''],
    email: [''],
  });
  isBusy = false;

  async save() {
    this.isBusy = true;
    if (this.utils.form.isValid(this.schoolForm)) {
      try {
        const newSchool = this.schoolForm.value;
        const school: School = await this.schoolsRepository.add(newSchool);
        const user: User = await this.auth.getCurrentUser();
        user.schools.push(school._id);
        this.auth.snapshot = await this.auth.updateUser(user);
        await this.router.navigateByUrl('/setup/schoolyears');
        this.isBusy = false;
      } catch (e) {
        this.utils.common.alert(e.error && e.error.message ? e.error.message : e.message, 'Erreur');
        this.isBusy = false;
      }
    }
    this.isBusy = false;
  }


  ngOnInit() {
  }

}
