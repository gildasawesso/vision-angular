import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Transaction} from '../models/transaction';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsRepository extends BaseRepository<Transaction> {

  private balance$ = new BehaviorSubject<number>(undefined);

  get balance() { return this.balance$.asObservable(); }

  constructor() {
    super('/transactions');
    this.onUpdate();
  }

  private onUpdate() {
    this.stream.subscribe(async _ => {
      await this.getBalance();
    });
  }

  private async getBalance() {
    const balance = await this.query.get(`/balance`);
    this.balance$.next(balance);
  }
}
