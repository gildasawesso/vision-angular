import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FinanceStudentsComponent} from './finance-students/finance-students.component';
import {AdmissionComponent} from '../shared/components/admission/admission.component';
import {FinanceStudentsListComponent} from './finance-students/finance-students-list/finance-students-list.component';
import {FinanceComponent} from './finance.component';
import {SchoolFeesPaymentsComponent} from './finance-students/school-fees-payments/school-fees-payments.component';
import {ScholarshipTypesComponent} from './finance-students/scholarship-types/scholarship-types.component';
import {ExpensesListComponent} from './expenses/expenses-list/expenses-list.component';
import {ExpensesComponent} from './expenses/expenses.component';
import {IncomesComponent} from './incomes/incomes.component';
import {IncomesListComponent} from './incomes/incomes-list/incomes-list.component';
import {FinanceDashboardComponent} from './finance-students/finance-dashboard/finance-dashboard.component';
import {RegistrationComponent} from '../academy/students/registration/registration.component';
import {FeesComponent} from './finance-students/fees/fees.component';
import {FeeTypesComponent} from './finance-students/fees/fee-types/fee-types.component';
import {ExpenseTypesComponent} from './expenses/expense-types/expense-types.component';
import {IncomeTypesComponent} from './incomes/income-types/income-types.component';

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
          { path: 'registration', component: RegistrationComponent },
          { path: 'list', component: FinanceStudentsListComponent },
          { path: 'payments', component: SchoolFeesPaymentsComponent },
          { path: 'fees', component: FeesComponent },
          { path: 'fee-types', component: FeeTypesComponent },
          { path: '', redirectTo: 'registration', pathMatch: 'full' },
        ]
      },
      {
        path: 'expenses',
        component: ExpensesComponent,
        children: [
          { path: 'list', component: ExpensesListComponent },
          { path: 'expense-types', component: ExpenseTypesComponent },
          { path: '', redirectTo: 'list', pathMatch: 'full' },
        ]
      },
      {
        path: 'incomes',
        component: IncomesComponent,
        children: [
          { path: 'list', component: IncomesListComponent },
          { path: 'income-types', component: IncomeTypesComponent },
          { path: '', redirectTo: 'list', pathMatch: 'full' },
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
