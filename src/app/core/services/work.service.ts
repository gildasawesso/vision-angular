import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {constants} from '../constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  get(query: string): Observable<any> {
    const url = `${constants.api.baseUrl}${query}`;
    return this.httpClient.get(url);
  }

  post(query: string, body: any): Observable<any> {
    const url = `${constants.api.baseUrl}${query}`;
    return this.httpClient.post(url, body);
  }

  update(query: string, body: any): Observable<any> {
    const url = `${constants.api.baseUrl}${query}`;
    return this.httpClient.put(url, body);
  }

  patch(query: string, body: any): Observable<any> {
    const url = `${constants.api.baseUrl}${query}`;
    return this.httpClient.patch(url, body);
  }

  delete(query: string): Observable<any> {
    const url = `${constants.api.baseUrl}${query}`;
    return this.httpClient.delete(url);
  }

  request(method: string, query: string, options: any): Observable<any> {
    const url = `${constants.api.baseUrl}${query}`;
    return this.httpClient.request(method, url, options);
  }
}
