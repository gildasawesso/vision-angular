import {Injectable} from '@angular/core';
import {BaseRepository} from './base.repository';
import {SchoolYear} from '../models/school-year';
import {SchoolyearsDatasource} from '../datasources/schoolyears.datasource';
import {BehaviorSubject} from 'rxjs';
import {SchoolSession} from '../models/school-session';

@Injectable({
  providedIn: 'root'
})
export class SchoolyearsRepository extends BaseRepository<SchoolYear> {

  private schoolYearSelectedBehaviorSubject = new BehaviorSubject<SchoolYear>(null);
  private schoolYearTermSelectedBehaviorSubject = new BehaviorSubject<SchoolSession>(null);
  private schoolYearSelected$ = this.schoolYearSelectedBehaviorSubject.asObservable();
  private schoolYearTermSelected$ = this.schoolYearTermSelectedBehaviorSubject.asObservable();

  get selectedSchoolYear() {
    return this.schoolYearSelected$;
  }

  set selectedSchoolYear(schoolYear: SchoolYear | any) {
    this.schoolYearSelectedBehaviorSubject.next(schoolYear);
  }

  get selectedSchoolYearTerm() {
    return this.schoolYearTermSelected$;
  }

  set selectedSchoolYearTerm(schoolSession: SchoolSession | any) {
    this.schoolYearTermSelectedBehaviorSubject.next(schoolSession);
  }

  constructor(private schoolyearsDatasource: SchoolyearsDatasource) {
    super(schoolyearsDatasource);
  }
}
