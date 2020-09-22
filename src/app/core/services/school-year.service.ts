import {Injectable} from '@angular/core';
import {filter, single, take} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {SchoolYear} from '../models/school-year';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolYearService {

  schoolYearSelected$ = new BehaviorSubject<SchoolYear>(null);
  schoolYearSelected = this.schoolYearSelected$.asObservable().pipe(
    filter(schoolYear => schoolYear != null)
  );

  constructor(private api: ApiService) {
    this.init();
  }

  async init() {
    const schoolYear = await this.api.get(`/schoolyears/current`).toPromise<SchoolYear>();
    this.schoolYearSelected$.next(schoolYear);
  }
}
