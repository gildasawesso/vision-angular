import {Component, OnInit} from '@angular/core';
import {FeeTypesRepository} from '../../core/repositories/fee-types.repository';
import {FeeType} from '../../core/models/fee-type';
import {Utils} from '../../core/shared/utils';
import {AddOrEditFeeTypeComponent} from './add-or-edit-fee/add-or-edit-fee-type.component';
import {Repositories} from '../../core/repositories/repositories';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent implements OnInit {

  columns = [
    { prop: 'name', name: 'Nom'},
    { prop: 'amount', name: 'Montant'}
  ];

  mapping = {
    name: 'Nom',
    amount: 'Montant',
    'date deadline': 'Date Limite',
    options: 'Options'
  };
  fees: FeeType[];

  constructor(public feesRepository: FeeTypesRepository,
              private repo: Repositories,
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
    this.repo.fees.stream.subscribe(fees => {
      this.fees = [...fees];
    });
  }
}
