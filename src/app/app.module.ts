import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthInterceptor} from './core/interceptors/auth.interceptor';
import {NgxPermissionsModule, NgxPermissionsService} from 'ngx-permissions';
import {PermissionsService} from './core/services/permissions.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    PermissionsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (permissionsService: PermissionsService, ps: NgxPermissionsService ) => async () => {
        const permissions = await permissionsService.permissions;
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
