import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Repositories} from '../repositories/repositories';
import {SchoolYear} from '../models/school-year';
import {ApiService} from './api.service';
import {SchoolYearService} from './school-year.service';

@Injectable({
  providedIn: 'root'
})
export class StatsStudentsService {

  private schoolYear: SchoolYear;

  private genders$ = new BehaviorSubject<[number, number]>([null, null]);
  private effectifByClassroom$ = new BehaviorSubject<number[]>([]);
  private pastAndNewStudents$ = new BehaviorSubject<number[]>([]);

  get schoolGenders() { return this.genders$.asObservable(); }
  get effectifByClassroom() { return this.effectifByClassroom$.asObservable(); }
  get pastAndNewStudents() { return this.pastAndNewStudents$.asObservable(); }

  constructor(private repo: Repositories,
              private api: ApiService,
              private schoolYearService: SchoolYearService) {
    this.schoolYearService.schoolYear.subscribe(sy => this.schoolYear = sy);
    this.init();
  }

  protected async init(): Promise<void> {
    this.repo.registrations.stream.subscribe(async _ => {
      await this.getSchoolGenders();
      await this.getClassroomEffectif();
      await this.getSchoolPastAndNewEffectif();
    });
  }

  private async getSchoolPastAndNewEffectif() {
    const effectif = await this.get(`/stats/pastandnewstudents`);
    this.pastAndNewStudents$.next(effectif);
  }

  private async getSchoolGenders() {
    const genderStats = await this.get(`/stats/genders`);
    this.genders$.next([genderStats.boys, genderStats.girls]);
  }

  private async getClassroomEffectif() {
    const effectifs = await this.get(`/stats/classrooms/effectif`);
    this.effectifByClassroom$.next(effectifs);
  }

  private async get(url) {
    return this.api.get(`${url}?schoolyear=${this.schoolYear._id}`).toPromise();
  }
}
