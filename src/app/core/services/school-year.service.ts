import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SchoolYear} from '../models/school-year';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolYearService {

  private schoolYearSelected$ = new BehaviorSubject<SchoolYear>(null);

  get snapshot() {
    return this.schoolYearSelected$.value;
  }

  get schoolYear() {
    return this.schoolYearSelected$.asObservable();
  }

  set schoolYear(schoolYear: SchoolYear | any) {
    this.schoolYearSelected$.next(schoolYear);
  }

  constructor(private api: ApiService) {}

  async init() {
    this.schoolYear = await this.api.get(`/schoolyears/current`).toPromise<SchoolYear>();
  }
}
