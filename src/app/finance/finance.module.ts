import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { FinanceStudentsComponent } from './finance-students/finance-students.component';
import { FinanceDashboardComponent } from './finance-students/finance-dashboard/finance-dashboard.component';
import {FinanceRoutingModule} from './finance-routing.module';
import { FinanceStudentsListComponent } from './finance-students/finance-students-list/finance-students-list.component';
import { FinanceComponent } from './finance.component';
import { SchoolFeesPaymentsComponent } from './finance-students/school-fees-payments/school-fees-payments.component';
import { ScholarshipTypesComponent } from './finance-students/scholarship-types/scholarship-types.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { IncomesComponent } from './incomes/incomes.component';
import { ExpensesListComponent } from './expenses/expenses-list/expenses-list.component';
import { IncomesListComponent } from './incomes/incomes-list/incomes-list.component';
import {AcademyModule} from '../academy/academy.module';
import { FeesComponent } from './finance-students/fees/fees.component';
import { AddOrEditFeeComponent } from './finance-students/fees/add-or-edit-fee/add-or-edit-fee.component';
import { AddOrEditTrancheComponent } from './finance-students/fees/add-or-edit-tranche/add-or-edit-tranche.component';
import { FeeTypesComponent } from './finance-students/fees/fee-types/fee-types.component';
import { ExpenseTypesComponent } from './expenses/expense-types/expense-types.component';
import { IncomeTypesComponent } from './incomes/income-types/income-types.component';

@NgModule({
  declarations: [
    FinanceStudentsComponent,
    FinanceDashboardComponent,
    FinanceStudentsListComponent,
    FinanceComponent,
    SchoolFeesPaymentsComponent,
    ScholarshipTypesComponent,
    ExpensesComponent,
    IncomesComponent,
    ExpensesListComponent,
    IncomesListComponent,
    FeesComponent,
    AddOrEditFeeComponent,
    AddOrEditTrancheComponent,
    FeeTypesComponent,
    ExpenseTypesComponent,
    IncomeTypesComponent
  ],
  imports: [
    SharedModule,
    FinanceRoutingModule,
    AcademyModule
  ],
  entryComponents: [
    AddOrEditFeeComponent,
    AddOrEditTrancheComponent
  ]
})
export class FinanceModule { }
