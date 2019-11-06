import { NgModule } from '@angular/core';
import {AcademyRoutingModule} from './academy-routing.module';
import {SharedModule} from '../core/shared/shared.module';
import { AcademyComponent } from './academy.component';
import { StudentsComponent } from './students/students.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { TeachersComponent } from './teachers/teachers.component';
import { StudentsListComponent } from './students/students-list/students-list.component';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
import {ClassroomsListComponent} from './classrooms/classrooms-list/classrooms-list.component';
import { AcademyDashboardComponent } from './academy-dashboard/academy-dashboard.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { SubjectsListComponent } from './subjects/subjects-list/subjects-list.component';
import { AddOrEditClassroomComponent } from './classrooms/add-or-edit-classroom/add-or-edit-classroom.component';
import { EditStudentComponent } from './students/edit-student/edit-student.component';
import { AddOrEditSubjectComponent } from './subjects/add-or-edit-subject/add-or-edit-subject.component';
import { AddOrEditTeacherComponent } from './teachers/add-or-edit-teacher/add-or-edit-teacher.component';
import { EffectifComponent } from './academy-dashboard/effectif/effectif.component';
import { EffectifPerClassroomComponent } from './academy-dashboard/effectif-per-classroom/effectif-per-classroom.component';

@NgModule({
  declarations: [
    AcademyComponent,
    StudentsComponent,
    ClassroomsComponent,
    TeachersComponent,
    StudentsListComponent,
    TeachersListComponent,
    ClassroomsListComponent,
    AcademyDashboardComponent,
    SubjectsComponent,
    SubjectsListComponent,
    AddOrEditClassroomComponent,
    EditStudentComponent,
    AddOrEditSubjectComponent,
    AddOrEditTeacherComponent,
    EffectifComponent,
    EffectifPerClassroomComponent
  ],
  imports: [
    AcademyRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    AddOrEditClassroomComponent,
    EditStudentComponent,
    AddOrEditSubjectComponent,
    AddOrEditTeacherComponent,
    EffectifComponent,
    EffectifPerClassroomComponent
  ],
  providers: [
  ]
})
export class AcademyModule { }
