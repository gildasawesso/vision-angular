import { Component, OnInit } from '@angular/core';
import {Utils} from '../../../core/shared/utils';
import {PaymentsRepository} from '../../../core/repositories/payments.repository';
import {Payment} from '../../../core/models/payment';
import {FormControl} from '@angular/forms';
import {AddOrEditSpendComponent} from './add-or-edit-spend/add-or-edit-spend.component';
import {AddOrEditIncomeComponent} from './add-or-edit-income/add-or-edit-income.component';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.scss']
})
export class BalanceSheetComponent implements OnInit {

  payments: Payment[];
  allPayments;
  filterStartDate = new FormControl();
  filterEndDate = new FormControl();

  constructor(public utils: Utils,
              private paymentsRepository: PaymentsRepository) { }

  async openSpentDialog() {
    const spent = await this.utils.common.dialogWithoutPadding(AddOrEditSpendComponent, null);
    console.log(spent);
  }

  async openIncomeDialog() {
    const spent = await this.utils.common.dialogWithoutPadding(AddOrEditIncomeComponent, null);
    console.log(spent);
  }

  ngOnInit() {
    this.paymentsRepository.stream.subscribe(payments => {
      this.payments = payments;
      this.allPayments = this.utils.student.allStudentsPaymentsWithOtherPayments(payments);
    });
  }

}
