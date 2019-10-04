import {Component, OnInit} from '@angular/core';
import {FeeTypesRepository} from '../../../repositories/fee-types.repository';
import {FeeType} from '../../../models/fee-type';
import {Utils} from '../../../shared/utils';
import {AddOrEditFeeTypeComponent} from './add-or-edit-fee/add-or-edit-fee-type.component';

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

  constructor(public feesRepository: FeeTypesRepository,
              private utils: Utils) {
  }

  async add() {
    await this.utils.common.modal(AddOrEditFeeTypeComponent, null);
  }

  async edit(fee: FeeType) {
    await this.utils.common.modal(AddOrEditFeeTypeComponent, fee);
  }

  async delete(fee: FeeType) {
    await this.feesRepository.remove(fee._id);
    this.utils.common.toast('Contribution supprimée');
  }

  ngOnInit() {

  }
}
