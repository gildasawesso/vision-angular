import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { SchoolInformationsComponent } from './settings/school-informations/school-informations.component';
import { SchoolYearsComponent } from './settings/school-years/school-years.component';
const routes = [
    {
        path: '', component: SettingsComponent, children: [
            { path: 'school', component: SchoolInformationsComponent },
            { path: 'schoolyears', component: SchoolYearsComponent },
            { path: '', redirectTo: 'school', pathMatch: 'full' },
        ]
    }
];
let SettingsRoutingModule = class SettingsRoutingModule {
};
SettingsRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], SettingsRoutingModule);
export { SettingsRoutingModule };
//# sourceMappingURL=settings-routing.module.js.map