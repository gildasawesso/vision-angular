import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {AuthenticatedGuard} from './core/guards/authenticated.guard';
import {IsConfiguredGuard} from './core/guards/is-configured.guard';


const routes: Routes = [
  { path: 'setup', loadChildren: () => import('./setup/setup.module').then(m => m.SetupModule) },
  { path: 'auth', canActivate: [IsConfiguredGuard], loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '', canActivate: [IsConfiguredGuard, AuthenticatedGuard], canActivateChild: [IsConfiguredGuard, AuthenticatedGuard], loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
