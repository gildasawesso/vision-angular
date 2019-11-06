import { Injectable } from '@angular/core';
import {BaseDatasource} from './base.datasource';
import {Payment} from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsDatasource extends BaseDatasource<Payment> {

  constructor() {
    super('/payments', 'populate=student&populate=schoolYear&populate=classroom&populate=registrationFee&populate=schoolFee&sort=-_id');
  }
}
