import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ReRegistrationComponent } from './re-registration/re-registration.component';
import { SharedModule } from '../core/shared/shared.module';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { RegisterComponent } from './re-registration/register/register.component';
import { FinanceModule } from '../finance/finance.module';
let RegistrationModule = class RegistrationModule {
};
RegistrationModule = __decorate([
    NgModule({
        declarations: [
            RegistrationComponent,
            ReRegistrationComponent,
            RegisterComponent,
        ],
        imports: [
            RegistrationRoutingModule,
            FinanceModule,
            SharedModule
        ]
    })
], RegistrationModule);
export { RegistrationModule };
//# sourceMappingURL=registration.module.js.map