import {Component, OnInit} from '@angular/core';
import {PaymentRepository} from '../../../core/repositories/payments.repository';
import {Payment} from '../../../models/payment';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-scholarships',
  templateUrl: './school-fees-payments.component.html',
  styleUrls: ['./school-fees-payments.component.scss']
})
export class SchoolFeesPaymentsComponent implements OnInit {

  contributions: Payment[];
  datasource;

  mapping = {
    'student.firstname student.lastname': 'Nom de l\'élève',
    'fee.name': 'Type de contribution',
    amount: 'Montant',
    paymentOptions: 'Options'
  };

  constructor(public contributionsRepository: PaymentRepository) {
  }

  ngOnInit() {
    this.contributionsRepository.stream
      .subscribe((contributions: Payment[]) => {
        this.contributions = contributions;
        this.datasource = new MatTableDataSource<Payment>(contributions);
      });
  }

}
