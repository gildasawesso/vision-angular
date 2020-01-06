import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FinanceStudentsComponent} from './students/finance-students.component';
import {FinanceComponent} from './finance.component';
import {PaymentsComponent} from './students/fees/payments/payments.component';
import {ExpensesListComponent} from './expenses/expenses-list/expenses-list.component';
import {ExpensesComponent} from './expenses/expenses.component';
import {IncomesComponent} from './incomes/incomes.component';
import {IncomesListComponent} from './incomes/incomes-list/incomes-list.component';
import {FinanceDashboardComponent} from './students/finance-dashboard/finance-dashboard.component';
import {FeesComponent} from './students/fees/fees.component';
import {FeeCategoriesComponent} from './students/fees/fee-categories/fee-categories.component';
import {ExpenseTypesComponent} from './balance/expense-types/expense-types.component';
import {IncomeTypesComponent} from './balance/income-types/income-types.component';
import {PaymentsStateComponent} from './students/payments-state/payments-state.component';
import {BalanceComponent} from './balance/balance.component';
import {BalanceSheetComponent} from './balance/balance-sheet/balance-sheet.component';

const routes: Routes = [
  {
    path: '',
    component: FinanceComponent,
    children: [
      {
        path: 'dashboard',
        component: FinanceDashboardComponent
      },
      {
        path: 'students',
        component: FinanceStudentsComponent,
        children: [
          { path: 'state', component: PaymentsStateComponent },
          { path: 'payments', component: PaymentsComponent },
          { path: 'fees', component: FeesComponent },
          { path: 'fee-categories', component: FeeCategoriesComponent },
          { path: '', redirectTo: 'payments', pathMatch: 'full' },
        ]
      },
      {
        path: 'balance',
        component: BalanceComponent,
        children: [
          { path: '', component: BalanceSheetComponent },
          { path: 'expense-types', component: ExpenseTypesComponent },
          { path: 'income-types', component: IncomeTypesComponent },
          { path: '', redirectTo: '', pathMatch: 'full' },
        ]
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
