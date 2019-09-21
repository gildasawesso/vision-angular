import {Component, OnInit} from '@angular/core';
import {FeesRepository} from '../../../core/repositories/fees.repository';
import {Fee} from '../../../models/fee';
import {Utils} from '../../../shared/utils';
import {AddOrEditFeeComponent} from './add-or-edit-fee/add-or-edit-fee.component';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent implements OnInit {

  mapping = {
    name: 'Nom',
    amount: 'Montant',
    'date deadline': 'Date Limite',
    options: 'Options'
  };

  constructor(public feesRepository: FeesRepository,
              private utils: Utils) {
  }

  async add() {
    await this.utils.common.modal(AddOrEditFeeComponent, null);
  }

  async edit(fee: Fee) {
    await this.utils.common.modal(AddOrEditFeeComponent, fee);
  }

  async delete(fee: Fee) {
    await this.feesRepository.remove(fee._id);
    this.utils.common.toast('Contribution supprimée');
  }

  ngOnInit() {

  }
}
