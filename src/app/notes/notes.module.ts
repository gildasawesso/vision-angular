import { NgModule } from '@angular/core';
import { ExaminationComponent } from './examination/examination.component';
import { BulletinsComponent } from './bulletins/bulletins.component';
import {NotesComponent} from './notes.component';
import {SharedModule} from '../core/shared/shared.module';
import {NotesRoutingModule} from './notes-routing.module';
import {AddOrEditExaminationComponent} from './examination/add-or-edit-examination/add-or-edit-examination.component';
import { AddOrEditExaminationTypeComponent } from './examination/add-or-edit-examination-type/add-or-edit-examination-type.component';
import { MarksComponent } from './examination/marks/marks.component';



@NgModule({
  declarations: [
    NotesComponent,
    ExaminationComponent,
    BulletinsComponent,
    AddOrEditExaminationComponent,
    AddOrEditExaminationTypeComponent,
    MarksComponent
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
export class NotesModule { }
