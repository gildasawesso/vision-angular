import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
const routes = [
    { path: 'users', component: UsersComponent },
    { path: 'roles', component: RolesComponent },
    { path: '', redirectTo: 'users', pathMatch: 'full' },
];
let StaffRoutingModule = class StaffRoutingModule {
};
StaffRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forChild(routes)
        ],
        exports: [
            RouterModule
        ]
    })
], StaffRoutingModule);
export { StaffRoutingModule };
//# sourceMappingURL=staff-routing.module.js.map