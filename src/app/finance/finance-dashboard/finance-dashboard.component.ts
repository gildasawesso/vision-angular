import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Utils} from '../../core/shared/utils';
import {Payment} from '../../core/models/payment';
import {PaymentsRepository} from '../../core/repositories/payments.repository';
import {Services} from '../../core/services/services';

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
              private services: Services,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.services.statsPayment.paymentsPki.subscribe(pki => {
      this.pkiCards = [
        {title: 'Total', cols: 1, rows: 1, value: pki[0], color: 'linear-gradient(to right, #f953c6, #b91d73)'},
        {title: 'Scolarité', cols: 1, rows: 1, value: pki[1], color: 'linear-gradient(90deg, rgb(54, 181, 183) 0%,rgb(19, 126, 105) 100%)'},
        {title: 'Inscriptions', cols: 1, rows: 1, value: pki[2], color: 'linear-gradient(to right, #396afc, #2948ff)'},
        {title: 'Autres Contributions', cols: 1, rows: 1, value: pki[3], color: 'linear-gradient(to right, #da22ff, #9733ee)'}
      ];
    });
  }
}
