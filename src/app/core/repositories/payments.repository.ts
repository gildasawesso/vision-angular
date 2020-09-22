import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Payment} from '../models/payment';
import {PaymentsDatasource} from '../datasources/payments.datasource';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsRepository extends BaseRepository<Payment> {

  public classroomsPayments: BehaviorSubject<unknown> = new BehaviorSubject<unknown>(null);

  constructor(private contributionDatasource: PaymentsDatasource) {
    super(contributionDatasource);
  }

  async init() {
    await super.init();
    this.schoolYearService.schoolYearSelected.subscribe(async schoolYear => {
      const payments = await this.datasource.api.get(`/payments/classrooms?schoolyear=${schoolYear._id}`).toPromise();
      this.classroomsPayments.next(payments);
    });
  }
}
