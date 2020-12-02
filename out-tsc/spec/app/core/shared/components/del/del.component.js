import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DelDataSource } from './del-datasource';
let DelComponent = class DelComponent {
    constructor() {
        /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
        this.displayedColumns = ['id', 'name'];
    }
    ngOnInit() {
        this.dataSource = new DelDataSource();
    }
    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
    }
};
__decorate([
    ViewChild(MatPaginator)
], DelComponent.prototype, "paginator", void 0);
__decorate([
    ViewChild(MatSort)
], DelComponent.prototype, "sort", void 0);
__decorate([
    ViewChild(MatTable)
], DelComponent.prototype, "table", void 0);
DelComponent = __decorate([
    Component({
        selector: 'app-del',
        templateUrl: './del.component.html',
        styleUrls: ['./del.component.scss']
    })
], DelComponent);
export { DelComponent };
//# sourceMappingURL=del.component.js.map