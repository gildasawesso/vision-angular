import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularMaterialModule} from '../vendors/angular-material.module';
import { AdmissionComponent } from './components/admission/admission.component';
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
import { CustomizableAlertDialogComponent } from './components/customizable-alert-dialog/customizable-alert-dialog.component';
import {PrintUtil} from './utils/print.utils';
import {FormUtil} from './utils/form.util';
import { SpacedPipe } from './pipes/spaced.pipe';
import { DateComponent } from './components/date/date.component';
import { BigButtonComponent } from './components/big-button/big-button.component';
import {NgxPermissionsModule} from 'ngx-permissions';
import {ChartsModule} from 'ng2-charts';
import { ChartHostDirective } from './directives/chart-host.directive';
import { AdvancedSelectComponent } from './components/advanced-select/advanced-select.component';
import {StudentUtil} from './utils/student.util';
import {ExaminationUtil} from './utils/examination.util';
import { LoadingComponent } from './components/loading/loading.component';
import { CloseButtonComponent } from './components/close-button/close-button.component';
import { ListComponent } from './components/list/list.component';
import { NewInputComponent } from './components/new-input/new-input.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { DatatableComponent } from './components/datatable/datatable.component';
import { ReductionLabelPipe } from './pipes/reductionLabel.pipe';
import { ReductionPipe } from './pipes/reduction.pipe';
import { WorkInProgressComponent } from './components/work-in-progress/work-in-progress.component';
import { StudentChooserComponent } from './components/student-chooser/student-chooser.component';
import {AtomSpinnerModule} from 'angular-epic-spinners';
import { ProgressColorPipe } from './pipes/progress-color.pipe';

const components = [
  AdmissionComponent,
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
  DelComponent,
  DateComponent,
  BigButtonComponent,
  AdvancedSelectComponent,
  LoadingComponent,
  CloseButtonComponent,
  NewInputComponent,
  ListComponent,
  DatatableComponent,
  ReductionLabelPipe,
  ReductionPipe,
  WorkInProgressComponent,
  StudentChooserComponent,
];

const directives = [
  ChartHostDirective
];

const pipes = [
  SpacedPipe,
];

const modules = [
  AngularMaterialModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NgxPermissionsModule,
  ChartsModule,
  RouterModule,
  NgxDatatableModule,
  AtomSpinnerModule
];

@NgModule({
  declarations: [
    ...components,
    ...pipes,
    ...directives,
    ProgressColorPipe
  ],
  imports: [
    ...modules,
  ],
    exports: [
        ...components,
        ...pipes,
        ...directives,
        ...modules,
        ProgressColorPipe
    ],
  entryComponents: [
    AlertDialogComponent,
    AlertDialogYesNoComponent,
    AlertDialogYesWithInputComponent,
    CustomizableAlertDialogComponent,
    LoadingComponent
  ],
  providers: [
    FormUtil,
    Common,
    PrintUtil,
    StudentUtil,
    ExaminationUtil,
    Utils
  ]
})
export class SharedModule { }
