import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {BehaviorSubject} from 'rxjs';
import {TransactionType} from '../models/transaction-type';
import {constants} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class TransactionTypesRepository extends BaseRepository<TransactionType> {

  private incomesTypes$ = new BehaviorSubject<TransactionType[]>([]);
  private expensesTypes$ = new BehaviorSubject<TransactionType[]>([]);

  get incomeTypes() { return this.incomesTypes$.asObservable(); }
  get expenseTypes() { return this.expensesTypes$.asObservable(); }

  constructor() {
    super('/transactions/types');
    this.onUpdate();
  }

  private onUpdate() {
    this.stream.subscribe(async types => {
      const incomes = types.filter(type => type.type === constants.common.incomeTransaction);
      const expenses = types.filter(type => type.type === constants.common.expenseTransaction);
      this.incomesTypes$.next(incomes);
      this.expensesTypes$.next(expenses);
    });
  }
}
