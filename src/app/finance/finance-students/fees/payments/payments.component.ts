import {Component, OnInit} from '@angular/core';
import {PaymentsRepository} from '../../../../repositories/payments.repository';
import {Payment} from '../../../../models/payment';
import {Utils} from '../../../../shared/utils';
import {AddOrEditPaymentComponent} from '../add-or-edit-payment/add-or-edit-payment.component';

@Component({
  selector: 'app-scholarships',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor(public paymentRepository: PaymentsRepository,
              private utils: Utils) {
  }

  mapping = {
    'append student.firstname student.lastname': 'Nom de l\'élève',
    'classroom.name': 'Classe',
    'date createdAt': 'Date de payement',
    'append registrationFee.name schoolFee.name': 'Type de contribution',
    amount: 'Montant',
    options: 'Options'
  };

  async add() {
    await this.utils.common.modal(AddOrEditPaymentComponent, { payment: null });
  }

  async edit(payment: Payment) {
    await this.utils.common.modal(AddOrEditPaymentComponent, { payment });
  }

  ngOnInit() {
  }

}
