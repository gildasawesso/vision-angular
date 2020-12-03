import { NgModule } from '@angular/core';
import {SharedModule} from '../core/shared/shared.module';
import { StaffComponent } from './staff.component';
import {StaffRoutingModule} from './staff-routing.module';
import {AddOrEditUserComponent} from './add-or-edit-user/add-or-edit-user.component';
import { RolesComponent } from './roles/roles.component';
import { AddOrEditRoleComponent } from './roles/add-or-edit-role/add-or-edit-role.component';



@NgModule({
  declarations: [
    StaffComponent,
    AddOrEditUserComponent,
    StaffComponent,
    RolesComponent,
    AddOrEditRoleComponent
  ],
  imports: [
    StaffRoutingModule,
    SharedModule
  ],
  entryComponents: [
    AddOrEditUserComponent,
    AddOrEditRoleComponent
  ]
})
export class StaffModule { }
