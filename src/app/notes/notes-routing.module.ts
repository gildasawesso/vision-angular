import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExaminationComponent} from './examination/examination.component';
import {BulletinsComponent} from './bulletins/bulletins.component';
import {ExaminationTypesComponent} from './examination/examination-types/examination-types.component';
import {ExaminationsListComponent} from './examination/examinations-list/examinations-list.component';


const routes: Routes = [
  {
    path: 'examinations', component: ExaminationComponent, children: [
      {path: 'list', component: ExaminationsListComponent},
      {path: 'types', component: ExaminationTypesComponent},
      {path: '', redirectTo: 'list', pathMatch: 'full'},
    ]
  },
  {path: 'bulletins', component: BulletinsComponent},
  {path: '', redirectTo: 'examinations', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class NotesRoutingModule {
}
