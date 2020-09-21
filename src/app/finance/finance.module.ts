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
import { ExpenseTypesComponent } from './balance/expense-types/expense-types.component';
import { IncomeTypesComponent } from './balance/income-types/income-types.component';
import { EditPaymentComponent } from './students/fees/payments/edit-payment/edit-payment.component';
import { AddPaymentComponent } from './students/fees/payments/add-payment/add-payment.component';
import { PaymentsStateComponent } from './students/payments-state/payments-state.component';
import { BalanceComponent } from './balance/balance.component';
import { BalanceSheetComponent } from './balance/balance-sheet/balance-sheet.component';
import { AddOrEditSpendComponent } from './balance/balance-sheet/add-or-edit-spend/add-or-edit-spend.component';
import { AddOrEditIncomeComponent } from './balance/balance-sheet/add-or-edit-income/add-or-edit-income.component';
import {ReductionsComponent} from './reductions/reductions.component';
import {AddOrEditReductionComponent} from './reductions/add-or-edit-reduction/add-or-edit-reduction.component';

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
    EditPaymentComponent,
    AddPaymentComponent,
    PaymentsStateComponent,
    BalanceComponent,
    BalanceSheetComponent,
    AddOrEditSpendComponent,
    AddOrEditIncomeComponent,
    ReductionsComponent,
    AddOrEditReductionComponent,
  ],
    imports: [
        SharedModule,
        FinanceRoutingModule,
    ],
  entryComponents: [
    AddOrEditFeeTypeComponent,
    AddOrEditTrancheComponent,
    EditPaymentComponent,
    AddPaymentComponent,
    AddOrEditSpendComponent,
    AddOrEditIncomeComponent
  ],
  exports: [
    AddOrEditReductionComponent
  ]
})
export class FinanceModule { }
