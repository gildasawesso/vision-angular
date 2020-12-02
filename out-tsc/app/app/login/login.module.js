import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../core/shared/shared.module';
let LoginModule = class LoginModule {
};
LoginModule = __decorate([
    NgModule({
        declarations: [
            SigninComponent,
            SignupComponent
        ],
        imports: [
            LoginRoutingModule,
            SharedModule
        ]
    })
], LoginModule);
export { LoginModule };
//# sourceMappingURL=login.module.js.map