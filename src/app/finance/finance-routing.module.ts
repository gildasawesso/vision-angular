import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FinanceComponent} from './finance.component';
import {PaymentsComponent} from './payments/payments.component';
import {FinanceDashboardComponent} from './finance-dashboard/finance-dashboard.component';
import {FeesComponent} from './fees/fees.component';
import {ExpenseTypesComponent} from './transactions/expense-types/expense-types.component';
import {IncomeTypesComponent} from './transactions/income-types/income-types.component';
import {PaymentsStateComponent} from './payments-state/payments-state.component';
import {TransactionComponent} from './transactions/transaction.component';

const routes: Routes = [
  {
    path: '',
    component: FinanceComponent,
    children: [
      {path: 'dashboard', component: FinanceDashboardComponent},
      {path: 'expense-types', component: ExpenseTypesComponent},
      {path: 'income-types', component: IncomeTypesComponent},
      {path: 'state', component: PaymentsStateComponent},
      {path: 'payments', component: PaymentsComponent},
      {path: 'fees', component: FeesComponent},
      {path: 'transactions', component: TransactionComponent,},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule {
}
