import { NgModule } from '@angular/core';
import { SetupSchoolComponent } from './setup-school/setup-school.component';
import { SetupSchoolyearsComponent } from './setup-schoolyears/setup-schoolyears.component';
import { SetupAdminComponent } from './setup-admin/setup-admin.component';
import {SetupRoutingModule} from './setup-routing.module';
import {SharedModule} from '../core/shared/shared.module';



@NgModule({
  declarations: [
    SetupSchoolComponent,
    SetupSchoolyearsComponent,
    SetupAdminComponent
  ],
  imports: [
    SetupRoutingModule,
    SharedModule
  ]
})
export class SetupModule { }
