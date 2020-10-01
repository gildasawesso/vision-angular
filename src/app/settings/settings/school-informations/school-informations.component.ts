import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Utils} from '../../../core/shared/utils';
import {School} from '../../../core/models/school';
import {User} from '../../../core/models/user';
import {SchoolsRepository} from '../../../core/repositories/schools.repository';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-school-informations',
  templateUrl: './school-informations.component.html',
  styleUrls: ['./school-informations.component.scss']
})
export class SchoolInformationsComponent implements OnInit {

  schoolForm = this.formBuilder.group({
    _id: [''],
    name: ['', Validators.required],
    zipCode: [''],
    phones: [''],
    mobile: [''],
    address: ['', Validators.required],
    phone: [''],
    email: [''],
    subName: ['']
  });
  isBusy = false;
  isEdited = false;

  constructor(private formBuilder: FormBuilder,
              private utils: Utils,
              private schoolsRepository: SchoolsRepository,
              private router: Router,
              private auth: AuthService) { }

  async update() {
    this.isBusy = true;
    if (this.utils.form.isValid(this.schoolForm)) {
      try {
        const data = this.schoolForm.value;
        const school = await this.schoolsRepository.update(data, data._id);
        this.schoolForm.patchValue(school);
        this.isBusy = false;
        this.isEdited = false;
        this.utils.common.toast('les informations de l\'école ont été enrégistrées avec succès');
      } catch (e) {
        this.utils.common.alert(e.error && e.error.message ? e.error.message : e.message, 'Erreur');
        this.isEdited = false;
        this.isBusy = false;
      }
    }
    this.isBusy = false;
  }

  ngOnInit() {
    this.schoolForm.valueChanges
      .subscribe(_ => {
        this.isEdited = true;
      });
  }
}
