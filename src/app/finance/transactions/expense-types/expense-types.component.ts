import { Component, OnInit } from '@angular/core';
import {Utils} from '../../../core/shared/utils';
import {AddOrEditTransactionTypeComponent} from '../add-or-edit-transaction-type/add-or-edit-transaction-type.component';
import {TransactionType} from '../../../core/models/transaction-type';
import {Observable} from 'rxjs';
import {Repositories} from '../../../core/repositories/repositories';
import {Services} from '../../../core/services/services';

@Component({
  selector: 'app-expense-types',
  templateUrl: './expense-types.component.html',
  styleUrls: ['./expense-types.component.scss']
})
export class ExpenseTypesComponent implements OnInit {

  expenseTypes: Observable<TransactionType[]>;
  columns = [{ name: `Type`, prop: 'name' }];

  constructor(private repo: Repositories,
              private services: Services,
              private utils: Utils) { }

  async add() {
    const result: string = await this.utils.common.modal(AddOrEditTransactionTypeComponent, {
      message: `Ajout d'un type de dépense`
    }, null, {
      minWidth: 'auto',
      height: 'auto'
    });
    if (result) {
      const user = this.services.auth.snapshot;
      const type: TransactionType = {
        name: result,
        schoolId: user.schools[0],
        type: 'expense'
      };
      await this.repo.transactionTypes.add(type);
    }
  }

  async edit(type: TransactionType) {
    const result: string = await this.utils.common.modal(AddOrEditTransactionTypeComponent, {
      name: type.name,
      message: `Modification du type de dépense`
    }, null, {
      minWidth: 'auto',
      height: 'auto'
    });

    if (result && result !== type.name) {
      const user = this.services.auth.snapshot;
      const transactionType: TransactionType = {
        name: result,
        schoolId: user.schools[0],
        type: 'expense'
      };
      await this.repo.transactionTypes.update(transactionType, type._id);
    }
  }

  ngOnInit() {
    this.expenseTypes = this.repo.transactionTypes.expenseTypes;
  }
}
