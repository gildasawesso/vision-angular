import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../services/auth.service';
import * as moment from 'moment';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const credentials = this.auth.credentials;
    let httpRequest: any = req;
    if (credentials) {
      httpRequest = req.clone({
        setHeaders: { Authorization: `Bearer ${credentials.accessToken}`}
      });
    }

    return next.handle(httpRequest).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
       console.log(error?.error?.message);

       return throwError(error);
      }));
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
