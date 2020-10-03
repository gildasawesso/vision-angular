import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Repositories} from '../../core/repositories/repositories';
import {Observable} from 'rxjs';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {FormControl} from '@angular/forms';
import * as dayjs from 'dayjs';
import {Transaction} from '../../core/models/transaction';
import {Utils} from '../../core/shared/utils';
import {AddOrEditTransactionComponent} from './add-or-edit-transaction/add-or-edit-transaction.component';
import {constants} from '../../core/constants';

@Component({
  selector: 'app-balance',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  get startDateFiltering() {
    return localStorage.getItem(constants.common.balanceStartDateKey);
  }

  set startDateFiltering(date) {
    localStorage.setItem(constants.common.balanceStartDateKey, date);
  }

  get endDateFiltering() {
    return localStorage.getItem(constants.common.balanceEndDateKey);
  }

  set endDateFiltering(date) {
    localStorage.setItem(constants.common.balanceEndDateKey, date);
  }

  balance: Observable<number>;
  transactions: Transaction[];
  columns;
  groupedTransactions;
  constants = constants;

  datePickerFilter = new FormControl([
    this.startDateFiltering ? new Date(this.startDateFiltering) : dayjs(),
    this.endDateFiltering ? new Date(this.endDateFiltering) : dayjs()
  ]);

  ranges: any = [
    {
      value: [new Date(new Date().setDate(new Date().getDate() - 1)), new Date()],
      label: 'Hier'
    },
    {
      value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()],
      label: 'Derniers 7 jours'
    },
    {
      value: [new Date(new Date().setDate(new Date().getDate() - 30)), new Date()],
      label: 'Derniers 30 jours'
    }
  ];

  datePickerConfg: Partial<BsDatepickerConfig> = {
    rangeInputFormat: 'DD MMM YY',
    showPreviousMonth: true,
    isAnimated: true,
    ranges: this.ranges
  };

  @ViewChild('actions', {static: true}) actionsTemplate: TemplateRef<any>;

  constructor(private repo: Repositories,
              private utils: Utils) {
  }

  async spend() {
    await this.utils.common.modal(AddOrEditTransactionComponent, {
      operation: constants.common.expenseTransaction
    }, null, {
      height: 'auto',
      minWidth: 500
    });
  }

  async addIncome() {
    await this.utils.common.modal(AddOrEditTransactionComponent, {
      operation: constants.common.incomeTransaction
    }, null, {
      height: 'auto',
      minWidth: 500
    });
  }

  async edit(transaction: Transaction) {
    await this.utils.common.modal(AddOrEditTransactionComponent, {
      operation: constants.common.incomeTransaction,
      transaction
    }, null, {
      height: 'auto',
      minWidth: 500
    });
  }

  async delete(transaction: Transaction) {
    await this.repo.transactions.remove(transaction._id);
  }

  getGroupedTransactions(transactions: Transaction[]) {
    const transactionNormalized = transactions.map(transaction => {
      return {
        ...transaction,
        transactionDate: dayjs(transaction.transactionDate).format('DD MMMM YYYY')
      };
    });
    const group = this.utils.common.groupBy('transactionDate', transactionNormalized);
    const groupKeys = Object.keys(group).sort((d1, d2) => dayjs(d2).diff(d1, 'day'));
    return groupKeys.map(key => [key, group[key]]);
  }

  filterTransactions() {

  }

  ngOnInit() {
    this.balance = this.repo.transactions.balance;

    this.repo.transactions.stream.subscribe(transactions => {
      this.transactions = transactions;
      this.groupedTransactions = this.getGroupedTransactions(transactions);
    });

    this.datePickerFilter.valueChanges.subscribe(range => {
      const start = range[0];
      const end = range[1];

      this.startDateFiltering = start;
      this.endDateFiltering = end;

      const transactions = this.transactions.filter(transaction => {
        const cond1 = dayjs(transaction.transactionDate).isSame(dayjs(start), 'day') || dayjs(transaction.transactionDate).isAfter(dayjs(start), 'day');
        const cond2 = dayjs(transaction.transactionDate).isSame(dayjs(end), 'day') || dayjs(transaction.transactionDate).isBefore(dayjs(end), 'day');
        return cond1 && cond2;
      });
      this.groupedTransactions = this.getGroupedTransactions(transactions);
    });

    this.columns = [
      {name: 'Description', prop: 'name'},
      {name: 'Montant', prop: 'amount'},
      {name: '', cellTemplate: this.actionsTemplate}
    ];
  }

}
