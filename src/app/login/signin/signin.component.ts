import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Utils} from '../../core/shared/utils';
import {Router} from '@angular/router';
import {formConstants} from '../../core/constants/form.constants';
import {Services} from '../../core/services/services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private utils: Utils,
              private formBuilder: FormBuilder,
              private router: Router,
              private services: Services) { }

  signinForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(formConstants.passwordMinimumLength)]],
  });
  isBusy = false;

  async signin() {
    this.isBusy = true;
    if (this.signinForm.valid) {
      const signinInfo = this.signinForm.value;
      try {
        await this.services.auth.signin(signinInfo.username, signinInfo.password);
        await this.services.permission.loadPermissions();
        await this.router.navigateByUrl('');
      } catch (e) {
        this.utils.common.alert(e.error.message, 'Erreur');
        this.isBusy = false;
      }
    } else {
      this.utils.form.invalidatedForm(this.signinForm);
      this.isBusy = false;
    }
  }

  ngOnInit() {

  }

}
