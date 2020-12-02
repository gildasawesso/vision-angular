import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ExaminationComponent } from './examination/examination.component';
import { BulletinsComponent } from './bulletins/bulletins.component';
import { NotesComponent } from './notes.component';
import { SharedModule } from '../core/shared/shared.module';
import { NotesRoutingModule } from './notes-routing.module';
import { AddOrEditExaminationComponent } from './examination/add-or-edit-examination/add-or-edit-examination.component';
import { AddOrEditExaminationTypeComponent } from './examination/add-or-edit-examination-type/add-or-edit-examination-type.component';
import { MarksComponent } from './examination/marks/marks.component';
import { ExaminationTypesComponent } from './examination/examination-types/examination-types.component';
import { ExaminationsListComponent } from './examination/examinations-list/examinations-list.component';
let NotesModule = class NotesModule {
};
NotesModule = __decorate([
    NgModule({
        declarations: [
            NotesComponent,
            ExaminationComponent,
            BulletinsComponent,
            AddOrEditExaminationComponent,
            AddOrEditExaminationTypeComponent,
            MarksComponent,
            ExaminationTypesComponent,
            ExaminationsListComponent
        ],
        imports: [
            NotesRoutingModule,
            SharedModule
        ],
        entryComponents: [
            AddOrEditExaminationComponent,
            AddOrEditExaminationTypeComponent,
            MarksComponent
        ]
    })
], NotesModule);
export { NotesModule };
//# sourceMappingURL=notes.module.js.map