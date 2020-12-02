import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SetupSchoolComponent } from './setup-school/setup-school.component';
import { SetupSchoolyearsComponent } from './setup-schoolyears/setup-schoolyears.component';
import { SetupAdminComponent } from './setup-admin/setup-admin.component';
const routes = [
    { path: 'school', component: SetupSchoolComponent },
    { path: 'schoolyears', component: SetupSchoolyearsComponent },
    { path: 'admin', component: SetupAdminComponent },
    { path: '', redirectTo: 'school', pathMatch: 'full' },
];
let SetupRoutingModule = class SetupRoutingModule {
};
SetupRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forChild(routes)
        ],
        exports: [
            RouterModule
        ]
    })
], SetupRoutingModule);
export { SetupRoutingModule };
//# sourceMappingURL=setup-routing.module.js.map