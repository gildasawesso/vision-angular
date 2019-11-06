import { NgModule } from '@angular/core';
import {SettingsRoutingModule} from './settings-routing.module';
import {SettingsComponent} from './settings/settings.component';
import {SharedModule} from '../core/shared/shared.module';


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [SettingsRoutingModule, SharedModule],
})
export class SettingsModule { }
