import { NgModule } from '@angular/core';
import {SettingsRoutingModule} from './settings-routing.module';
import {SettingsComponent} from './settings/settings.component';
import {SharedModule} from '../core/shared/shared.module';
import { SchoolInformationsComponent } from './settings/school-informations/school-informations.component';
import { SchoolYearsComponent } from './settings/school-years/school-years.component';


@NgModule({
  declarations: [
    SettingsComponent,
    SchoolInformationsComponent,
    SchoolYearsComponent
  ],
  imports: [SettingsRoutingModule, SharedModule],
})
export class SettingsModule { }
