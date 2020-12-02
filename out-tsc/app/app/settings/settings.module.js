import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../core/shared/shared.module';
import { SchoolInformationsComponent } from './settings/school-informations/school-informations.component';
import { SchoolYearsComponent } from './settings/school-years/school-years.component';
import { AddOrEditSchoolYearComponent } from './settings/school-years/add-or-edit-school-year/add-or-edit-school-year.component';
let SettingsModule = class SettingsModule {
};
SettingsModule = __decorate([
    NgModule({
        declarations: [
            SettingsComponent,
            SchoolInformationsComponent,
            SchoolYearsComponent,
            AddOrEditSchoolYearComponent
        ],
        imports: [SettingsRoutingModule, SharedModule]
    })
], SettingsModule);
export { SettingsModule };
//# sourceMappingURL=settings.module.js.map