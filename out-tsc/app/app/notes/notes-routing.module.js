import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExaminationComponent } from './examination/examination.component';
import { BulletinsComponent } from './bulletins/bulletins.component';
import { ExaminationTypesComponent } from './examination/examination-types/examination-types.component';
import { ExaminationsListComponent } from './examination/examinations-list/examinations-list.component';
const routes = [
    {
        path: 'examinations', component: ExaminationComponent, children: [
            { path: 'list', component: ExaminationsListComponent },
            { path: 'types', component: ExaminationTypesComponent },
            { path: '', redirectTo: 'list', pathMatch: 'full' },
        ]
    },
    { path: 'bulletins', component: BulletinsComponent },
    { path: '', redirectTo: 'examinations', pathMatch: 'full' },
];
let NotesRoutingModule = class NotesRoutingModule {
};
NotesRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forChild(routes)
        ],
        exports: [
            RouterModule
        ]
    })
], NotesRoutingModule);
export { NotesRoutingModule };
//# sourceMappingURL=notes-routing.module.js.map