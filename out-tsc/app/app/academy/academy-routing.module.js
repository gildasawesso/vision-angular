import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AcademyComponent } from './academy.component';
import { TeachersComponent } from './teachers/teachers.component';
import { StudentsComponent } from './students/students.component';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { AcademyDashboardComponent } from './academy-dashboard/academy-dashboard.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { SubjectsListComponent } from './subjects/subjects-list/subjects-list.component';
const routes = [
    {
        path: '',
        component: AcademyComponent,
        children: [
            { path: 'dashboard', component: AcademyDashboardComponent },
            { path: 'students', component: StudentsComponent },
            { path: 'classrooms', component: ClassroomsComponent },
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
let AcademyRoutingModule = class AcademyRoutingModule {
};
AcademyRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], AcademyRoutingModule);
export { AcademyRoutingModule };
//# sourceMappingURL=academy-routing.module.js.map