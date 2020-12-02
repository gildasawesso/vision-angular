import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { ReRegistrationComponent } from './re-registration/re-registration.component';
const routes = [
    { path: 'register', component: RegistrationComponent },
    { path: 're-register', component: ReRegistrationComponent },
    { path: '', redirectTo: 'register', pathMatch: 'full' },
];
let RegistrationRoutingModule = class RegistrationRoutingModule {
};
RegistrationRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forChild(routes)
        ],
        exports: [
            RouterModule
        ]
    })
], RegistrationRoutingModule);
export { RegistrationRoutingModule };
//# sourceMappingURL=registration-routing.module.js.map