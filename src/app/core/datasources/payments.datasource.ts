import { Injectable } from '@angular/core';
import {BaseDatasource} from './base.datasource';
import {Payment} from '../../models/payment';

@Injectable({
  providedIn: 'root'
})
export class ContributionsDatasource extends BaseDatasource<Payment> {

  constructor() {
    super('/contributions', '?populate=student&populate=schoolYear&populate=fee');
  }
}
