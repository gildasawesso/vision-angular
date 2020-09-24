import {Injectable} from '@angular/core';
import {BaseRepository} from './base.repository';
import {Registration} from '../models/registration';
import {RegistrationsDatasource} from '../datasources/registrations.datasource';
import {Classroom} from '../models/classroom';
import {filter, first, map} from 'rxjs/operators';
import {Student} from '../models/student';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationsRepository extends BaseRepository<Registration> {

  private lastYearStudents$ = new BehaviorSubject<Registration[]>(null);

  get lastYearRegisrations(): Observable<Registration[]> {
    return this.lastYearStudents$;
  }

  constructor(private registrationsDatasource: RegistrationsDatasource) {
    super(registrationsDatasource);
  }

  studentReductions(student: string) {
    console.log(student);
    return this.datasource.query.get(`/student/${student}/reductions`);
  }

  async init(): Promise<void> {
    await super.init();
    this.schoolYearService.schoolYear.subscribe(async schoolYear => {
      if (schoolYear == null) { return; }
      const registrations: Registration[] = await this.datasource.api.get(`/registrations/lastyear?schoolyear=${schoolYear?._id}`).pipe(
        map(rs => rs.filter(r => r.student != null))
      ).toPromise();
      this.lastYearStudents$.next(registrations);
    });
  }

  genders(classroom: Classroom) {
    return [];
  }

  studentsForClassroom(registrations: Registration[], classroom: Classroom) {
    return classroom ? registrations.filter(r => r.classroom._id === classroom._id).map(r => r.student) : registrations.map(r => r.student);
  }
}
