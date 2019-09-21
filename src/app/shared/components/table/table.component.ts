import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import * as luxon from 'luxon';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit, OnChanges {

  @Input() data;
  @Input() mapping;
  @Input() includeOption;

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<any>;

  humanReadable;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  onEdit(element: any) {
    this.edit.emit(element);
  }

  onDelete(element: any) {
    this.delete.emit(element);
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
      if (keySplitted[0] === 'date') {
        const value = this.resolve(keySplitted[1], object);
        const date = luxon.DateTime.fromISO(value, {locale: 'fr'});
        return date.toFormat('dd LLLL');
      } else {
        const firstValue = this.resolve(keySplitted[0], object);
        const secondValue = this.resolve(keySplitted[1], object);
        return firstValue + ' ' + secondValue;
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
    this.table.dataSource = this.dataSource;
  }

  ngOnInit() {
    this.humanReadable = Object.values(this.mapping);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) { this.dataSource.data = this.data; }
  }
}
