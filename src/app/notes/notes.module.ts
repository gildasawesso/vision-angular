import { NgModule } from '@angular/core';
import { ExaminationComponent } from './examination/examination.component';
import { BulletinsComponent } from './bulletins/bulletins.component';
import { ExaminationTypeComponent } from './examination/examination-type/examination-type.component';
import {NotesComponent} from './notes.component';
import {SharedModule} from '../core/shared/shared.module';
import {NotesRoutingModule} from './notes-routing.module';
import {AddOrEditExaminationComponent} from './examination/add-or-edit-examination/add-or-edit-examination.component';



@NgModule({
  declarations: [
    NotesComponent,
    ExaminationComponent,
    BulletinsComponent,
    ExaminationTypeComponent,
    AddOrEditExaminationComponent
  ],
  imports: [
    NotesRoutingModule,
    SharedModule
  ],
  entryComponents: [
    AddOrEditExaminationComponent
  ]
})
export class NotesModule { }
