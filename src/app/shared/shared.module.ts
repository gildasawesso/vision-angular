import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
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

const components = [
  ToolbarComponent,
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
  SelectComponent
];

@NgModule({
  declarations: [
    ...components,
    UnderConstructionComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ...components,
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UnderConstructionComponent
  ],
  entryComponents: [
    AlertDialogComponent,
    AlertDialogYesNoComponent,
    AlertDialogYesWithInputComponent,
  ],
  providers: [
    Common,
    Utils
  ]
})
export class SharedModule { }
