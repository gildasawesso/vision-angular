import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
const routes = [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
];
let LoginRoutingModule = class LoginRoutingModule {
};
LoginRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forChild(routes)
        ],
        exports: [
            RouterModule
        ]
    })
], LoginRoutingModule);
export { LoginRoutingModule };
//# sourceMappingURL=login-routing.module.js.map