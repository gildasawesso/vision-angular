import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Payment} from '../../models/payment';
import {ContributionsDatasource} from '../datasources/contributions.datasource';

@Injectable({
  providedIn: 'root'
})
export class PaymentRepository extends BaseRepository<Payment> {

  constructor(private contributionDatasource: ContributionsDatasource) {
    super(contributionDatasource);
  }
}
