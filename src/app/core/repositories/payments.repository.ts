import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Payment} from '../models/payment';
import {PaymentsDatasource} from '../datasources/payments.datasource';
import {Utils} from '../shared/utils';
import {BehaviorSubject, Observable} from 'rxjs';
import {SchoolyearsRepository} from './schoolyears.repository';

@Injectable({
  providedIn: 'root'
})
export class PaymentsRepository extends BaseRepository<Payment> {

  public classroomsPayments: BehaviorSubject<unknown> = new BehaviorSubject<unknown>(null);

  constructor(private contributionDatasource: PaymentsDatasource,
              private schoolyearsRepository: SchoolyearsRepository) {
    super(contributionDatasource);
  }

  async init() {
    await super.init();
    this.schoolyearsRepository.selectedSchoolYear.subscribe(async sy => {
      if (sy === undefined || sy == null) { return; }
      const payments = await this.datasource.api.get(`/v2/payments/classrooms?schoolyear=${sy._id}`).toPromise();
      this.classroomsPayments.next(payments);
    });
  }
}
