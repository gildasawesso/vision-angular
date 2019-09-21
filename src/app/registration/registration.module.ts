import { NgModule } from '@angular/core';
import { ReRegistrationComponent } from './re-registration/re-registration.component';
import {SharedModule} from '../shared/shared.module';
import {RegistrationRoutingModule} from './registration-routing.module';
import {RegistrationComponent} from './registration/registration.component';



@NgModule({
  declarations: [
    RegistrationComponent,
    ReRegistrationComponent
  ],
  imports: [
    RegistrationRoutingModule,
    SharedModule
  ]
})
export class RegistrationModule { }
