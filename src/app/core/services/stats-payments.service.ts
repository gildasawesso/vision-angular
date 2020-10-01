import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Repositories} from '../repositories/repositories';
import {SchoolYear} from '../models/school-year';
import {ApiService} from './api.service';
import {SchoolYearService} from './school-year.service';

@Injectable({
  providedIn: 'root'
})
export class StatsPaymentsService {

  private schoolYear: SchoolYear;

  private paymentsPki$ = new BehaviorSubject<[number, number, number, number]>([null, null, null, null]);

  get paymentsPki() { return this.paymentsPki$.asObservable(); }

  constructor(private repo: Repositories,
              private api: ApiService,
              private schoolYearService: SchoolYearService) {
    this.schoolYearService.schoolYear.subscribe(sy => this.schoolYear = sy);
    this.init();
  }

  protected async init(): Promise<void> {
    this.repo.payments.stream.subscribe(async _ => {
      await this.paymentsPKI();
    });
  }

  private async paymentsPKI() {
    const payments = await this.get(`/stats/payments`);
    console.log(payments);
    this.paymentsPki$.next(payments);
  }

  private async get(url) {
    return this.api.get(`${url}?schoolyear=${this.schoolYear._id}`).toPromise();
  }
}
