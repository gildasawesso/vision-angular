import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {RolesComponent} from './roles/roles.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'roles', component: RolesComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
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
