import { NgModule } from '@angular/core';
import {
  MAT_DATE_LOCALE,
  MatButtonModule, MatButtonToggleModule, MatDatepickerModule,
  MatDialogModule, MatDividerModule,
  MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatRadioModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule,
  MatSnackBarModule, MatSortModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

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
  MatSlideToggleModule,
  MatDatepickerModule,
  MatMomentDateModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...angularModules
  ],
  exports: [
    ...angularModules
    ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
  ]
})
export class AngularMaterialModule { }
