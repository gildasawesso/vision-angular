import {Component, OnInit} from '@angular/core';
import {PaymentRepository} from '../../../../core/repositories/payments.repository';

@Component({
  selector: 'app-scholarships',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  mapping = {
    'student.firstname student.lastname': 'Nom de l\'élève',
    'date createdAt': 'Date de payement',
    'fee.name': 'Type de contribution',
    amount: 'Montant',
    options: 'Options'
  };

  constructor(public paymentRepository: PaymentRepository) {
  }

  ngOnInit() {

  }

}
