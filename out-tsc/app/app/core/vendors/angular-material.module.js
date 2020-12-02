import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ScrollingModule } from '@angular/cdk/scrolling';
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
    MatSidenavModule,
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
    MatGridListModule,
    MatCardModule,
    MatExpansionModule,
    ScrollingModule
];
let AngularMaterialModule = class AngularMaterialModule {
};
AngularMaterialModule = __decorate([
    NgModule({
        declarations: [],
        imports: [
            ...angularModules
        ],
        exports: [
            ...angularModules
        ],
        providers: [
            { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
        ]
    })
], AngularMaterialModule);
export { AngularMaterialModule };
//# sourceMappingURL=angular-material.module.js.map