import { Component, OnInit } from '@angular/core';
import {Repositories} from '../../../core/repositories/repositories';
import {Observable} from 'rxjs';
import {TransactionType} from '../../../core/models/transaction-type';
import {Utils} from '../../../core/shared/utils';
import {AddOrEditTransactionTypeComponent} from '../add-or-edit-transaction-type/add-or-edit-transaction-type.component';
import {Services} from '../../../core/services/services';
import {constants} from '../../../core/constants';

@Component({
  selector: 'app-income-types',
  templateUrl: './income-types.component.html',
  styleUrls: ['./income-types.component.scss']
})
export class IncomeTypesComponent implements OnInit {

  incomeTypes: Observable<TransactionType[]>;
  columns = [{ name: `Type`, prop: 'name' }];

  constructor(private repo: Repositories,
              private services: Services,
              private utils: Utils) { }

  async add() {
    const result: string = await this.utils.common.modal(AddOrEditTransactionTypeComponent, {
      message: `Ajout d'un type de revenu`
    }, null, {
      minWidth: 'auto',
      height: 'auto'
    });
    if (result) {
      const user = this.services.auth.currentUser;
      const type: TransactionType = {
        name: result,
        schoolId: user.schools[0],
        type: 'income'
      };
      await this.repo.transactionTypes.add(type);
    }
  }

  async edit(type: TransactionType) {
    const result: string = await this.utils.common.modal(AddOrEditTransactionTypeComponent, {
      name: type.name,
      message: `Modification du type de revenu`
    }, null, {
      minWidth: 'auto',
      height: 'auto'
    });

    if (result && result !== type.name) {
      const user = this.services.auth.currentUser;
      const transactionType: TransactionType = {
        name: result,
        schoolId: user.schools[0],
        type: constants.common.incomeTransaction
      };
      await this.repo.transactionTypes.update(transactionType, type._id);
    }
  }

  async remove(type: TransactionType) {

  }

  ngOnInit() {
    this.incomeTypes = this.repo.transactionTypes.incomeTypes;
  }

}
