import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Utils} from '../../../core/shared/utils';
import {Payment} from '../../../core/models/payment';
import {PaymentsRepository} from '../../../core/repositories/payments.repository';

@Component({
  selector: 'app-finance-dashboard',
  templateUrl: './finance-dashboard.component.html',
  styleUrls: ['./finance-dashboard.component.scss']
})
export class FinanceDashboardComponent implements OnInit {

  pkiTileHeigth = 140;
  pkiCards = [];
  payments: Payment[] = [];

  constructor(private utils: Utils,
              private paymentsRepository: PaymentsRepository,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.pkiCards = [
      {title: 'Payements Total', cols: 1, rows: 1, value: '', color: 'linear-gradient(to right, #f953c6, #b91d73)'},
      {title: 'Payements scolarité', cols: 1, rows: 1, value: '', color: 'linear-gradient(90deg, rgb(54, 181, 183) 0%,rgb(19, 126, 105) 100%)'},
      {title: 'Pay. inscriptions', cols: 1, rows: 1, value: '', color: 'linear-gradient(to right, #396afc, #2948ff)'},
      {title: 'Pay. Ré-inscriptions', cols: 1, rows: 1, value: '', color: 'linear-gradient(to right, #396afc, #2948ff)'},
      {title: 'Autres dépenses', cols: 1, rows: 1, value: '', color: 'linear-gradient(to right, #da22ff, #9733ee)'}
    ];

    this.paymentsRepository.stream.subscribe(payments => {
      this.payments = payments;
      this.pkiCards[0].value = this.utils.student.allStudentsPaymentsWithOtherPayments(payments);
      this.pkiCards[1].value = this.utils.student.allStudentsSchoolFeesPayments(payments);
      this.pkiCards[2].value = this.utils.student.allStudentsRegistrationsPayments(payments);
      this.pkiCards[3].value = this.utils.student.allStudentsReRegistrationsPayments(payments);
      this.pkiCards[4].value = this.utils.student.allStudentsOtherFeesPayments(payments);
    });
  }
}
