import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SetupSchoolComponent} from './setup-school/setup-school.component';
import {SetupSchoolyearsComponent} from './setup-schoolyears/setup-schoolyears.component';
import {SetupAdminComponent} from './setup-admin/setup-admin.component';


const routes: Routes = [
  { path: 'school', component: SetupSchoolComponent },
  { path: 'schoolyears', component: SetupSchoolyearsComponent },
  { path: 'admin', component: SetupAdminComponent },
  { path: '', redirectTo: 'school', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SetupRoutingModule { }
