import { NgModule } from '@angular/core';
import {SharedModule} from '../core/shared/shared.module';
import { FinanceStudentsComponent } from './students/finance-students.component';
import { FinanceDashboardComponent } from './students/finance-dashboard/finance-dashboard.component';
import {FinanceRoutingModule} from './finance-routing.module';
import { FinanceStudentsListComponent } from './students/finance-students-list/finance-students-list.component';
import { FinanceComponent } from './finance.component';
import { PaymentsComponent } from './students/fees/payments/payments.component';
import { ScholarshipTypesComponent } from './students/scholarship-types/scholarship-types.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { IncomesComponent } from './incomes/incomes.component';
import { ExpensesListComponent } from './expenses/expenses-list/expenses-list.component';
import { IncomesListComponent } from './incomes/incomes-list/incomes-list.component';
import { FeesComponent } from './students/fees/fees.component';
import { AddOrEditFeeTypeComponent } from './students/fees/add-or-edit-fee/add-or-edit-fee-type.component';
import { AddOrEditTrancheComponent } from './students/fees/add-or-edit-tranche/add-or-edit-tranche.component';
import { FeeCategoriesComponent } from './students/fees/fee-categories/fee-categories.component';
import { ExpenseTypesComponent } from './expenses/expense-types/expense-types.component';
import { IncomeTypesComponent } from './incomes/income-types/income-types.component';
import { AddOrEditPaymentComponent } from './students/fees/add-or-edit-payment/add-or-edit-payment.component';

@NgModule({
  declarations: [
    FinanceStudentsComponent,
    FinanceDashboardComponent,
    FinanceStudentsListComponent,
    FinanceComponent,
    PaymentsComponent,
    ScholarshipTypesComponent,
    ExpensesComponent,
    IncomesComponent,
    ExpensesListComponent,
    IncomesListComponent,
    FeesComponent,
    AddOrEditFeeTypeComponent,
    AddOrEditTrancheComponent,
    FeeCategoriesComponent,
    ExpenseTypesComponent,
    IncomeTypesComponent,
    AddOrEditPaymentComponent
  ],
  imports: [
    SharedModule,
    FinanceRoutingModule,
  ],
  entryComponents: [
    AddOrEditFeeTypeComponent,
    AddOrEditTrancheComponent,
    AddOrEditPaymentComponent
  ]
})
export class FinanceModule { }