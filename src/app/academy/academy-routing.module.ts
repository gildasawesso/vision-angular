import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AcademyComponent} from './academy.component';
import {TeachersComponent} from './teachers/teachers.component';
import {StudentsComponent} from './students/students.component';
import {ClassroomsComponent} from './classrooms/classrooms.component';
import {AcademyDashboardComponent} from './academy-dashboard/academy-dashboard.component';
import {SubjectsComponent} from './subjects/subjects.component';


const routes: Routes = [
  {
    path: '',
    component: AcademyComponent,
    children: [
      { path: 'dashboard', component: AcademyDashboardComponent },
      { path: 'students',  component: StudentsComponent },
      { path: 'classrooms', component: ClassroomsComponent },
      { path: 'teachers', component: TeachersComponent },
      { path: 'subjects', component: SubjectsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademyRoutingModule { }
