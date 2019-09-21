import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {HomeContentComponent} from './home/home-content/home-content.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    children: [
      { path: '', component: HomeContentComponent },
      { path: 'finance', loadChildren: () => import('../finance/finance.module').then(m => m.FinanceModule) },
      { path: 'academy', loadChildren: () => import('../academy/academy.module').then(m => m.AcademyModule) },
      { path: 'registration', loadChildren: () => import('../registration/registration.module').then(m => m.RegistrationModule) },
      { path: 'settings', loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
