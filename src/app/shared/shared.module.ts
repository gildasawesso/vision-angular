import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppbarComponent } from './components/appbar/appbar.component';
import {AngularMaterialModule} from '../vendors/angular-material.module';
import { AdmissionComponent } from './components/admission/admission.component';
import { SubbarComponent } from './components/subbar/subbar.component';
import {RouterModule} from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertDialogComponent} from './components/alert-dialog/alert-dialog.component';
import {AlertDialogYesNoComponent} from './components/alert-dialog-yes-no/alert-dialog-yes-no.component';
import {AlertDialogYesWithInputComponent} from './components/alert-dialog-yes-with-input/alert-dialog-yes-with-input.component';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { TableComponent } from './components/table/table.component';
import {Utils} from './utils';
import {Common} from './utils/common.util';
import { SelectComponent } from './components/select/select.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { DelComponent } from './components/del/del.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CustomizableAlertDialogComponent } from './components/customizable-alert-dialog/customizable-alert-dialog.component';
import {PrintUtil} from './utils/print.utils';

const components = [
  AppbarComponent,
  AdmissionComponent,
  SubbarComponent,
  ButtonComponent,
  InputComponent,
  AlertDialogComponent,
  AlertDialogYesNoComponent,
  AlertDialogYesWithInputComponent,
  ActionButtonComponent,
  TableComponent,
  SelectComponent,
  CustomizableAlertDialogComponent,
  UnderConstructionComponent,
  DelComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    ...components,
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    AlertDialogComponent,
    AlertDialogYesNoComponent,
    AlertDialogYesWithInputComponent,
    CustomizableAlertDialogComponent
  ],
  providers: [
    Common,
    PrintUtil,
    Utils
  ]
})
export class SharedModule { }
