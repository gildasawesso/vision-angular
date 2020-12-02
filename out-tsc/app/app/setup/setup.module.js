import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { SetupSchoolComponent } from './setup-school/setup-school.component';
import { SetupSchoolyearsComponent } from './setup-schoolyears/setup-schoolyears.component';
import { SetupAdminComponent } from './setup-admin/setup-admin.component';
import { SetupRoutingModule } from './setup-routing.module';
import { SharedModule } from '../core/shared/shared.module';
let SetupModule = class SetupModule {
};
SetupModule = __decorate([
    NgModule({
        declarations: [
            SetupSchoolComponent,
            SetupSchoolyearsComponent,
            SetupAdminComponent
        ],
        imports: [
            SetupRoutingModule,
            SharedModule
        ]
    })
], SetupModule);
export { SetupModule };
//# sourceMappingURL=setup.module.js.map