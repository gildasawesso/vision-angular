import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { constants } from '../../../constants';
let TableComponent = class TableComponent {
    constructor() {
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();
        this.printPayment = new EventEmitter();
        this.viewNotes = new EventEmitter();
        this.dataSource = new MatTableDataSource();
        this.permissions = constants.permissions;
    }
    onEdit(element) {
        this.edit.emit(element);
    }
    onPrintPayment(element) {
        this.printPayment.emit(element);
    }
    onDelete(element) {
        this.delete.emit(element);
    }
    onViewNotes(element) {
        this.viewNotes.emit(element);
    }
    valueFromColumnDisplayed(valueDisplayed, model) {
        const modelKey = Object.keys(this.mapping).find(mappingKey => {
            return this.mapping[mappingKey] === valueDisplayed;
        });
        return this.getValueFromKey(modelKey, model);
    }
    getValueFromKey(key, object) {
        const keySplitted = key.split(' ');
        if (keySplitted.length > 1) {
            const format = keySplitted[0];
            switch (format) {
                case 'date':
                    const date = this.resolve(keySplitted[1], object);
                    return this.displayDate(date, keySplitted[2]);
                case 'append':
                    const keys = keySplitted.slice(1);
                    const values = keys.map(val => this.resolve(val, object));
                    return this.displayAppendedValues(values);
                case 'array':
                    const array = this.resolve(keySplitted[1], object);
                    if (array == null) {
                        return '';
                    }
                    const arrayDisplayProperty = keySplitted[2];
                    const separator = keySplitted[3];
                    return this.displayArray(array, arrayDisplayProperty, separator);
            }
        }
        else {
            return this.resolve(key, object);
        }
    }
    resolve(path, obj) {
        return path.split('.').reduce((prev, curr) => {
            return prev ? prev[curr] : null;
        }, obj || self);
    }
    ngAfterViewInit() {
        this.dataSource.data = this.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    displayArray(array, displayProperty, seperator = ' & ') {
        const value = array.reduce((acc, cur) => acc + ' ' + seperator + ' ' + this.resolve(displayProperty, cur), '');
        return value.toString().slice(2);
    }
    displayAppendedValues(values) {
        return values.reduce((acc, cur) => {
            if (cur == null) {
                return acc;
            }
            return acc + ' ' + cur;
        }, '');
    }
    displayDate(date, format) {
        let dateFormat = 'DD MMMM YYYY';
        if (format) {
            dateFormat = format;
        }
        return moment(date).format(dateFormat);
    }
    ngOnInit() {
        this.humanReadable = Object.values(this.mapping);
    }
    ngOnChanges(changes) {
        if (this.data) {
            this.dataSource.data = this.data;
        }
    }
};
__decorate([
    Input()
], TableComponent.prototype, "data", void 0);
__decorate([
    Input()
], TableComponent.prototype, "mapping", void 0);
__decorate([
    Input()
], TableComponent.prototype, "includeOption", void 0);
__decorate([
    Input()
], TableComponent.prototype, "customElements", void 0);
__decorate([
    Input()
], TableComponent.prototype, "optionPermissions", void 0);
__decorate([
    Output()
], TableComponent.prototype, "edit", void 0);
__decorate([
    Output()
], TableComponent.prototype, "delete", void 0);
__decorate([
    Output()
], TableComponent.prototype, "printPayment", void 0);
__decorate([
    Output()
], TableComponent.prototype, "viewNotes", void 0);
__decorate([
    ViewChild(MatPaginator)
], TableComponent.prototype, "paginator", void 0);
__decorate([
    ViewChild(MatSort)
], TableComponent.prototype, "sort", void 0);
TableComponent = __decorate([
    Component({
        selector: 'app-table',
        templateUrl: './table.component.html',
        styleUrls: ['./table.component.scss']
    })
], TableComponent);
export { TableComponent };
//# sourceMappingURL=table.component.js.map