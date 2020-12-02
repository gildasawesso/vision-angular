import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {FeeType} from '../models/fee-type';
import {PaymentsRepository} from './payments.repository';

@Injectable({
  providedIn: 'root'
})
export class FeeTypesRepository extends BaseRepository<FeeType> {

  constructor(private payments: PaymentsRepository) {
    super('/fees');
  }

  otherPayments() {
    return this.query.get('/others');
  }

  async update(object: FeeType, id: any, idKey: any = '_id'): Promise<any> {
    const result = await super.update(object, id, idKey);
    this.payments.sync();
    return result;
  }
}
