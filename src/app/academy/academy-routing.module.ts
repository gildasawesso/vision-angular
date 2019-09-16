import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AcademyComponent} from './academy.component';
import {StudentsComponent} from './students/students.component';
import {ClassroomsComponent} from './classrooms/classrooms.component';
import {TeachersComponent} from './teachers/teachers.component';
import {StudentsListComponent} from './students/students-list/students-list.component';
import {TeachersListComponent} from './teachers/teachers-list/teachers-list.component';
import {ClassroomsListComponent} from './classrooms/classrooms-list/classrooms-list.component';
import {AcademyDashboardComponent} from './academy-dashboard/academy-dashboard.component';
import {SubjectsComponent} from './subjects/subjects.component';
import {SubjectsListComponent} from './subjects/subjects-list/subjects-list.component';


const routes: Routes = [
  {
    path: '',
    component: AcademyComponent,
    children: [
      {
        path: 'dashboard',
        component: AcademyDashboardComponent
      },
      {
        path: 'students',
        component: StudentsComponent,
        children: [
          { path: 'list', component: StudentsListComponent },
          { path: '', redirectTo: 'list', pathMatch: 'full' },
        ]
      },
      {
        path: 'classrooms',
        component: ClassroomsComponent,
        children: [
          { path: 'list', component: ClassroomsListComponent },
          { path: '', redirectTo: 'list', pathMatch: 'full' },
        ]
      },
      {
        path: 'teachers',
        component: TeachersComponent,
        children: [
          { path: 'list', component: TeachersListComponent },
          { path: '', redirectTo: 'list', pathMatch: 'full' },
        ]
      },
      {
        path: 'subjects',
        component: SubjectsComponent,
        children: [
          { path: 'list', component: SubjectsListComponent },
          { path: '', redirectTo: 'list', pathMatch: 'full' },
        ]
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademyRoutingModule { }
