import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {AuthService} from './auth.service';
import {SchoolYearService} from './school-year.service';
import {SchoolYear} from '../models/school-year';
import {BehaviorSubject} from 'rxjs';
import {WorkService} from './work.service';

@Injectable({
  providedIn: 'root'
})
export class BulletinService {
  private bulletins$ = new BehaviorSubject(null);

  get bulletins() { return this.bulletins$.asObservable(); }


  constructor(private api: ApiService,
              private auth: AuthService,
              private work: WorkService,
              private schoolYearService: SchoolYearService) {
    this.getBulletins();
  }

  private getBulletins() {
    this.schoolYearService.schoolYear.subscribe(async schoolYear => {
      if (schoolYear == null) return;
      this.work.started('Récupération des bulletins en cours...');
      const bulletins = await this.api.get(`/bulletins?schoolyear=${schoolYear._id}`).toPromise();
      this.bulletins$.next(bulletins);
      this.work.ended();
    });
  }
}
