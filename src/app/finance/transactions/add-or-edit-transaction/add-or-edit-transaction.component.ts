import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Repositories} from '../../../core/repositories/repositories';
import {TransactionType} from '../../../core/models/transaction-type';
import {Observable} from 'rxjs';
import {Transaction} from '../../../core/models/transaction';
import * as moment from 'moment';
import {Services} from '../../../core/services/services';
import {constants} from '../../../core/constants';
import {Utils} from '../../../core/shared/utils';
import {date} from '@ng-validators/ng-validators';

@Component({
  selector: 'app-add-or-edit-transaction',
  templateUrl: './add-or-edit-transaction.component.html',
  styleUrls: ['./add-or-edit-transaction.component.scss']
})
export class AddOrEditTransactionComponent implements OnInit {

  operation: string;
  types: Observable<TransactionType[]>;
  transaction: Transaction;

  amount = new FormControl(0, [Validators.required, Validators.min(0)]);
  name = new FormControl('', Validators.required);
  transactionType = new FormControl(Validators.required);

  transactionForm = this.fb.group({
    name: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(1)]],
    type: ['', Validators.required],
    date: [new Date(), [Validators.required, date]]
  });


  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<any>,
              private fb: FormBuilder,
              private services: Services,
              private repo: Repositories,
              private utils: Utils) {
    this.operation = this.data.operation;
    this.transaction = this.data.transaction;
  }

  async save() {
    console.log(this.transactionForm);
    if (this.utils.form.isValid(this.transactionForm)) {
      if (this.transaction) {
        await this.edit();
      } else {
        await this.add();
      }
    } else {
      this.utils.common.toast(`Il existe des erreurs dans le formulaire`);
    }
  }

  async add() {
    const transactionLike = this.transactionForm.value;
    const user = this.services.auth.snapshot;
    const transaction: Transaction = {
      name: transactionLike.name,
      amount: Number(transactionLike.amount),
      transactionTypeId: transactionLike.type,
      transactionDate: transactionLike.date,
      operation: this.operation,
      schoolId: user.schools[0],
      schoolYearId: this.services.schoolYear.snapshot._id
    };
    try {
      await this.repo.transactions.add(transaction);
      this.dialogRef.close();
    } catch (e) {
      console.error(e);
      this.utils.common.alert(JSON.stringify(e), `Une erreur est survenue`);
    }
  }

  async edit() {
    const transactionLike = this.transactionForm.value;
    const user = this.services.auth.snapshot;
    const transaction: Transaction = {
      name: transactionLike.name,
      amount: Number(transactionLike.amount),
      transactionTypeId: transactionLike.type,
      transactionDate: transactionLike.date,
      operation: this.operation,
      schoolId: user.schools[0],
      schoolYearId: this.services.schoolYear.snapshot._id
    };
    try {
      await this.repo.transactions.update(transaction, this.transaction._id);
      this.dialogRef.close();
    } catch (e) {
      console.error(e);
      this.utils.common.alert(JSON.stringify(e), `Une erreur est survenue`);
    }
  }

  ngOnInit(): void {
    if (this.operation === constants.common.expenseTransaction) {
      this.types = this.repo.transactionTypes.expenseTypes;
    } else {
      this.types = this.repo.transactionTypes.incomeTypes;
    }
  }

}
