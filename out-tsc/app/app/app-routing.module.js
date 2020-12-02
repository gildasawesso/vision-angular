import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { IsConfiguredGuard } from './core/guards/is-configured.guard';
const routes = [
    { path: 'setup', loadChildren: () => import('./setup/setup.module').then(m => m.SetupModule) },
    { path: 'auth', canActivate: [IsConfiguredGuard], loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    { path: '', canActivate: [IsConfiguredGuard, AuthenticatedGuard], canActivateChild: [IsConfiguredGuard, AuthenticatedGuard], loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
// imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
//# sourceMappingURL=app-routing.module.js.map