import { Component, OnInit } from '@angular/core';
import {Utils} from '../../../core/shared/utils';
import {PaymentsRepository} from '../../../core/repositories/payments.repository';
import {Payment} from '../../../core/models/payment';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.scss']
})
export class BalanceSheetComponent implements OnInit {

  payments: Payment[];
  allPayments;

  constructor(public utils: Utils,
              private paymentsRepository: PaymentsRepository) { }

  ngOnInit() {
    this.paymentsRepository.stream.subscribe(payments => {
      this.payments = payments;
      this.allPayments = this.utils.student.allStudentsPaymentsWithOtherPayments(payments);
    });
  }

}
