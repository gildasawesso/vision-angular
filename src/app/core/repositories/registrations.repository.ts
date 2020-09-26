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

  private lastYearRegistrations = new BehaviorSubject<Registration[]>(null);
  private genders$ = new BehaviorSubject<[number, number]>([null, null]);
  private effectif$ = new BehaviorSubject<number[]>([]);

  get effectif() {
    return this.effectif$.asObservable();
  }

  get genders() {
    return this.genders$.asObservable();
  }

  get lastYearRegisrations(): Observable<Registration[]> {
    return this.lastYearRegistrations;
  }

  constructor() {
    super('/registrations');
  }

  studentReductions(student: string) {
    return this.query.get(`/student/${student}/reductions`);
  }

  protected async init(): Promise<void> {
    await super.init();
    this.stream.subscribe(async _ => {
      await this.getLastYearRegistrations();
    });
  }

  private async getLastYearRegistrations() {
    let registrations: Registration[] = await this.query.get(`/lastyear`);
    registrations = registrations.filter(r => r.student != null);
    this.lastYearRegistrations.next(registrations);
  }

}
