import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Payment} from '../../models/payment';
import {PaymentsDatasource} from '../datasources/payments.datasource';

@Injectable({
  providedIn: 'root'
})
export class PaymentRepository extends BaseRepository<Payment> {

  constructor(private contributionDatasource: PaymentsDatasource) {
    super(contributionDatasource);
  }
}
