import { NgModule } from '@angular/core';
import {AcademyRoutingModule} from './academy-routing.module';
import {SharedModule} from '../shared/shared.module';
import { AcademyComponent } from './academy.component';
import { StudentsComponent } from './students/students.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { TeachersComponent } from './teachers/teachers.component';
import { StudentsListComponent } from './students/students-list/students-list.component';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
import {ClassroomsListComponent} from './classrooms/classrooms-list/classrooms-list.component';
import { RegistrationComponent } from './students/registration/registration.component';
import { AcademyDashboardComponent } from './academy-dashboard/academy-dashboard.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { SubjectsListComponent } from './subjects/subjects-list/subjects-list.component';
import { AddOrEditClassroomComponent } from './classrooms/add-or-edit-classroom/add-or-edit-classroom.component';

@NgModule({
  declarations: [
    AcademyComponent,
    StudentsComponent,
    ClassroomsComponent,
    TeachersComponent,
    StudentsListComponent,
    TeachersListComponent,
    ClassroomsListComponent,
    RegistrationComponent,
    AcademyDashboardComponent,
    SubjectsComponent,
    SubjectsListComponent,
    AddOrEditClassroomComponent
  ],
  imports: [
    AcademyRoutingModule,
    SharedModule
  ],
  exports: [
    RegistrationComponent,
  ],
  entryComponents: [
    AddOrEditClassroomComponent
  ],
  providers: [
  ]
})
export class AcademyModule { }
