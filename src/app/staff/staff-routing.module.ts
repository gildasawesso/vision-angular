import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StaffComponent} from './staff.component';
import {RolesComponent} from './roles/roles.component';

const routes: Routes = [
  { path: 'list', component: StaffComponent },
  { path: 'roles', component: RolesComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class StaffRoutingModule { }
