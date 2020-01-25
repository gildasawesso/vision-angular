import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Payment} from '../models/payment';
import {PaymentsDatasource} from '../datasources/payments.datasource';
import {Utils} from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class PaymentsRepository extends BaseRepository<Payment> {

  constructor(private contributionDatasource: PaymentsDatasource) {
    super(contributionDatasource);
  }
}
