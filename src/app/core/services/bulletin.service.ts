import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BulletinService {

  constructor(private api: ApiService, private auth: AuthService) { }

  async getBulletins() {
    const currentUser = await this.auth.userRemote;
    return this.api.get(`/bulletins?schoolId=${currentUser.schools[0]._id}`).toPromise();
  }
}
