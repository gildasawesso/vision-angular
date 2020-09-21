import {Injectable} from '@angular/core';
import {BaseRepository} from './base.repository';
import {Registration} from '../models/registration';
import {RegistrationsDatasource} from '../datasources/registrations.datasource';
import {Classroom} from '../models/classroom';
import {filter, map} from 'rxjs/operators';
import {Student} from '../models/student';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationsRepository extends BaseRepository<Registration> {

  private lastYearStudents$ = new BehaviorSubject<Registration[]>(null);
  private currentYearRegistrations$ = new BehaviorSubject<Registration[]>(null);

  get lastYearRegisrations(): Observable<Registration[]> {
    if (this.lastYearStudents$.value) {
      return this.lastYearStudents$.pipe(
        map(registrations => registrations.filter(r => r.student != null))
      );
    } else {
      return this.datasource.api.get('/registrations/lastyear').pipe(map(registrations => registrations.filter(r => r.student != null)));
    }
  }

  get currentYearRegistrations(): Observable<Registration[]> {
    if (this.lastYearStudents$.value) {
      return this.lastYearStudents$.pipe(
        map(registrations => registrations.filter(r => r.student != null))
      );
    } else {
      return this.datasource.api.get('/registrations/lastyear').pipe(map(registrations => registrations.filter(r => r.student != null)));
    }
  }

  constructor(private registrationsDatasource: RegistrationsDatasource) {
    super(registrationsDatasource);
  }

  genders(classroom: Classroom) {
    return this.stream.pipe(
      map((registrations: Registration[]) => registrations.map(r => r.student)),
      map((students: Student[]) => {
        return students.reduce((acc, cur) => {
          if (classroom) {
            cur.classroom._id === classroom._id ? cur.gender === 'M' ? acc.male += 1 : acc.female += 1 : acc;
          } else {
            if (cur != null) {
              cur.gender === 'M' ? acc.male += 1 : acc.female += 1;
            }
          }
          return acc;
        }, {male: 0, female: 0});
      })
    );
  }

  studentsForClassroom(registrations: Registration[], classroom: Classroom) {
    return classroom ? registrations.filter(r => r.classroom._id === classroom._id).map(r => r.student) : registrations.map(r => r.student);
  }
}
