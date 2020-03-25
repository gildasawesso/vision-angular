import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {formConstants} from '../../core/constants/form.constants';
import {Utils} from '../../core/shared/utils';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {Signup} from '../../core/models/app-models/signup';

@Component({
  selector: 'app-setup-admin',
  templateUrl: './setup-admin.component.html',
  styleUrls: ['./setup-admin.component.scss']
})
export class SetupAdminComponent implements OnInit {

  signupForm = this.formBuilder.group({
    username: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(formConstants.passwordMinimumLength)]],
    isAdmin: true
  });
  isBusy = false;
  passwordConfirmation = new FormControl('', [Validators.required, Validators.minLength(formConstants.passwordMinimumLength)]);

  constructor(private utils: Utils,
              private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  async signup() {
    this.isBusy = true;
    if (this.utils.form.isValid(this.signupForm)) {
      if (this.arePasswordsSame()) {
        const signupInfo: Signup = this.signupForm.value;
        try {
          await this.auth.signup(signupInfo);
          await this.router.navigateByUrl('/setup/school');
        } catch (e) {
          this.utils.common.alert(e.error.message, 'Erreur');
          this.isBusy = false;
        }
      } else {
        this.utils.common.toast('Les mots de passe sont différents');
        this.isBusy = false;
      }
    } else {
      this.isBusy = false;
    }
  }

  arePasswordsSame() {
    return this.signupForm.get('password').value === this.passwordConfirmation.value;
  }


  ngOnInit() {
  }

}
