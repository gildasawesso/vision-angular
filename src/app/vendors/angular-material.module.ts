import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatButtonToggleModule,
  MatDialogModule, MatDividerModule,
  MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatRadioModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule,
  MatSnackBarModule, MatSortModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';

const angularModules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatRadioModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  LayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDividerModule,
  MatSelectModule,
  MatButtonToggleModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSlideToggleModule
];

@NgModule({
  declarations: [],
  imports: [
    ...angularModules
  ],
  exports: [
    ...angularModules
    ],
})
export class AngularMaterialModule { }
