import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsComponent} from './settings/settings.component';
import {SchoolInformationsComponent} from './settings/school-informations/school-informations.component';
import {SchoolYearsComponent} from './settings/school-years/school-years.component';


const routes: Routes = [
  {
    path: '', component: SettingsComponent, children: [
      { path: 'school', component: SchoolInformationsComponent },
      { path: 'schoolyears', component: SchoolYearsComponent },
      { path: '', redirectTo: 'school', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
