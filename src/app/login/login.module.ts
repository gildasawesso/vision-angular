import { NgModule } from '@angular/core';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {LoginRoutingModule} from './login-routing.module';
import {SharedModule} from '../core/shared/shared.module';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    LoginRoutingModule,
    SharedModule
  ]
})
export class LoginModule { }
