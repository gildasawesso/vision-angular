import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import * as moment from 'moment';
import {constants} from '../../../constants';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit, OnChanges {

  @Input() data;
  @Input() mapping;
  @Input() includeOption;
  @Input() customElements;
  @Input() optionPermissions: { [optionName: string]: string };

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() printPayment = new EventEmitter();
  @Output() viewNotes = new EventEmitter();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  // @ViewChild(MatTable, {static: false}) table: MatTable<any>;

  humanReadable;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  permissions = constants.permissions;

  onEdit(element: any) {
    this.edit.emit(element);
  }

  onPrintPayment(element: any) {
    this.printPayment.emit(element);
  }

  onDelete(element: any) {
    this.delete.emit(element);
  }

  onViewNotes(element: any) {
    this.viewNotes.emit(element);
  }

  valueFromColumnDisplayed(valueDisplayed, model?: any) {
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
          const arrayDisplayProperty = keySplitted[2];
          const separator = keySplitted[3];
          return this.displayArray(array, arrayDisplayProperty, separator);
      }
    } else {
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
    // return array.reduce((acc, cur) => acc + ' ' + cur[displayProperty], '');
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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) { this.dataSource.data = this.data; }
  }
}
