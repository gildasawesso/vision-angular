import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Utils} from '../../core/shared/utils';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {formConstants} from '../../core/constants/form.constants';
import {PermissionsService} from '../../core/services/permissions.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private utils: Utils,
              private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private permissions: PermissionsService) { }

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
        await this.auth.signin(signinInfo.username, signinInfo.password);
        await this.permissions.loadPermissions();
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
