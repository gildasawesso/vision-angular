import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExaminationComponent} from './examination/examination.component';
import {BulletinsComponent} from './bulletins/bulletins.component';



const routes: Routes = [
  { path: 'examinations', component: ExaminationComponent },
  { path: 'bulletins', component: BulletinsComponent },
  { path: '', redirectTo: 'examinations', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class NotesRoutingModule { }
