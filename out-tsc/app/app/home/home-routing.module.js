import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeContentComponent } from './home/home-content/home-content.component';
const routes = [
    { path: '',
        component: HomeComponent,
        children: [
            { path: '', component: HomeContentComponent },
            { path: 'finance', loadChildren: () => import('../finance/finance.module').then(m => m.FinanceModule) },
            { path: 'academy', loadChildren: () => import('../academy/academy.module').then(m => m.AcademyModule) },
            { path: 'registration', loadChildren: () => import('../registration/registration.module').then(m => m.RegistrationModule) },
            { path: 'staff', loadChildren: () => import('../staff/staff.module').then(m => m.StaffModule) },
            { path: 'notes', loadChildren: () => import('../notes/notes.module').then(m => m.NotesModule) },
            { path: 'settings', loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule) }
        ]
    }
];
let HomeRoutingModule = class HomeRoutingModule {
};
HomeRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], HomeRoutingModule);
export { HomeRoutingModule };
//# sourceMappingURL=home-routing.module.js.map