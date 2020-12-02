import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { AcademyRoutingModule } from './academy-routing.module';
import { SharedModule } from '../core/shared/shared.module';
import { AcademyComponent } from './academy.component';
import { TeachersComponent } from './teachers/teachers.component';
import { StudentsComponent } from './students/students.component';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { AcademyDashboardComponent } from './academy-dashboard/academy-dashboard.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { SubjectsListComponent } from './subjects/subjects-list/subjects-list.component';
import { AddOrEditClassroomComponent } from './classrooms/add-or-edit-classroom/add-or-edit-classroom.component';
import { EditStudentComponent } from './students/edit-student/edit-student.component';
import { AddOrEditSubjectComponent } from './subjects/add-or-edit-subject/add-or-edit-subject.component';
import { AddOrEditTeacherComponent } from './teachers/add-or-edit-teacher/add-or-edit-teacher.component';
import { EffectifComponent } from './academy-dashboard/effectif/effectif.component';
import { EffectifPerClassroomComponent } from './academy-dashboard/effectif-per-classroom/effectif-per-classroom.component';
import { PastAndNewStudentsComponent } from './academy-dashboard/past-and-new-students/past-and-new-students.component';
let AcademyModule = class AcademyModule {
};
AcademyModule = __decorate([
    NgModule({
        declarations: [
            AcademyComponent,
            StudentsComponent,
            ClassroomsComponent,
            TeachersComponent,
            StudentsComponent,
            TeachersListComponent,
            ClassroomsComponent,
            AcademyDashboardComponent,
            SubjectsComponent,
            SubjectsListComponent,
            AddOrEditClassroomComponent,
            EditStudentComponent,
            AddOrEditSubjectComponent,
            AddOrEditTeacherComponent,
            EffectifComponent,
            EffectifPerClassroomComponent,
            PastAndNewStudentsComponent
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
        providers: []
    })
], AcademyModule);
export { AcademyModule };
//# sourceMappingURL=academy.module.js.map