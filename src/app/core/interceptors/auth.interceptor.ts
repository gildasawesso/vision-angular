import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const credentials = this.auth.credentials;
    if (credentials) {
      const request = req.clone({
        setHeaders: { Authorization: `Bearer ${credentials.accessToken}`}
      });
      return next.handle(request);
    }
    return next.handle(req);
  }

  isJwtTokenExpired(expiration) {
    const now = moment().format('X');
    return Number(now) - expiration > 0;
  }

  decodeJwtToken(token) {
    const payload = token.split('.')[1];
    return atob(payload);
  }
}
