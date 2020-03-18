import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BulletinService {

  constructor(private api: ApiService) { }

  getBulletins() {
    return this.api.get('/bulletins');
  }
}
