import {Injectable} from '@angular/core';
import {BaseRepository} from './base.repository';
import {Registration} from '../models/registration';
import {Classroom} from '../models/classroom';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {SchoolYear} from '../models/school-year';

@Injectable({
  providedIn: 'root'
})
export class RegistrationsRepository extends BaseRepository<Registration> {

  private lastYearStudents$ = new BehaviorSubject<Registration[]>(null);
  private genders$ = new BehaviorSubject<[number, number]>([null, null]);
  private effectif$ = new BehaviorSubject<number[]>([]);

  get effectif() {
    return this.effectif$.asObservable();
  }

  get genders() {
    return this.genders$.asObservable();
  }

  get lastYearRegisrations(): Observable<Registration[]> {
    return this.lastYearStudents$;
  }

  constructor() {
    super('/registrations');
  }

  studentReductions(student: string) {
    return this.datasource.query.get(`/student/${student}/reductions`);
  }

  protected async init(): Promise<void> {
    await super.init();
    this.schoolYearService.schoolYear.subscribe(async schoolYear => {
      if (schoolYear == null) { return; }
      const registrations: Registration[] = await this.datasource.api.get(`/registrations/lastyear?schoolyear=${schoolYear?._id}`).pipe(
        map(rs => rs.filter(r => r.student != null))
      ).toPromise();
      this.lastYearStudents$.next(registrations);
      await this.getGenders(schoolYear);
      await this.getEffectif(schoolYear);
    });
  }

  private async getGenders(schoolYear: SchoolYear) {
    const genderStats = await this.datasource.api.get(`/stats/genders?schoolyear=${schoolYear._id}`).toPromise();
    this.genders$.next([genderStats.boys, genderStats.girls]);
  }

  private async getEffectif(schoolYear: SchoolYear) {
    const effectifs = await this.datasource.api.get(`/stats/classrooms/effectif?schoolyear=${schoolYear._id}`).toPromise();
    this.effectif$.next(effectifs);
  }

  studentsForClassroom(registrations: Registration[], classroom: Classroom) {
    return classroom ? registrations.filter(r => r.classroom._id === classroom._id).map(r => r.student) : registrations.map(r => r.student);
  }
}
