import { NgModule } from '@angular/core';
import { ReRegistrationComponent } from './re-registration/re-registration.component';
import {SharedModule} from '../core/shared/shared.module';
import {RegistrationRoutingModule} from './registration-routing.module';
import {RegistrationComponent} from './registration/registration.component';
import { RegisterComponent } from './re-registration/register/register.component';
import { PayComponent } from './pay/pay.component';
import {FinanceModule} from '../finance/finance.module';
import { EditPayComponent } from './edit-pay/edit-pay.component';



@NgModule({
  declarations: [
    RegistrationComponent,
    ReRegistrationComponent,
    RegisterComponent,
    PayComponent,
    EditPayComponent
  ],
  imports: [
    RegistrationRoutingModule,
    FinanceModule,
    SharedModule
  ]
})
export class RegistrationModule { }
