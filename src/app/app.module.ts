import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthInterceptor} from './core/interceptors/auth.interceptor';
import {NgxPermissionsModule, NgxPermissionsService} from 'ngx-permissions';
import {PermissionsService} from './core/services/permissions.service';
import { MatDialogModule } from '@angular/material/dialog';
import { TestCompComponent } from './test-comp/test-comp.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';

@NgModule({
  declarations: [
    AppComponent,
    TestCompComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    NgxPermissionsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    PermissionsService,
    {
      provide: APP_INITIALIZER,
      useFactory: (permissionsService: PermissionsService, ps: NgxPermissionsService ) => async () => {
        const permissions = await permissionsService.userPermissions;
        ps.loadPermissions(permissions);
      },
      deps: [PermissionsService, NgxPermissionsService],
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {
}
