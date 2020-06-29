import { NgModule } from '@angular/core';
import {SharedModule} from '../core/shared/shared.module';
import { UsersComponent } from './users/users.component';
import { StaffComponent } from './staff.component';
import {StaffRoutingModule} from './staff-routing.module';
import {AddOrEditUserComponent} from './users/add-or-edit-user/add-or-edit-user.component';
import { RolesComponent } from './roles/roles.component';
import { AddOrEditRoleComponent } from './roles/add-or-edit-role/add-or-edit-role.component';



@NgModule({
  declarations: [
    UsersComponent,
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
