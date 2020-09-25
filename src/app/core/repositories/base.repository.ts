/**
 * Created by gildas on 4/15/2018.
 */

import {BehaviorSubject, Observable} from 'rxjs';
import {ApiService} from '../services/api.service';
import {inject, Injectable} from '@angular/core';
import {BaseDatasource} from '../datasources/base.datasource';
import {Common} from '../shared/utils/common.util';
import { MatDialog } from '@angular/material/dialog';
import {CustomizableAlertDialogComponent} from '../shared/components/customizable-alert-dialog/customizable-alert-dialog.component';
import {filter} from 'rxjs/operators';
import {SchoolyearsRepository} from './schoolyears.repository';
import {SchoolYearService} from '../services/school-year.service';
import {AuthService} from '../services/auth.service';

export abstract class BaseRepository<T> {

  protected genericBehavioSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>(null);
  private objects: Observable<T[]> = this.genericBehavioSubject.asObservable();

  private api: ApiService;
  private dialog: MatDialog;
  protected datasource: BaseDatasource<T>;
  protected schoolYearService: SchoolYearService;
  protected auth: AuthService;

  protected constructor(datasource: BaseDatasource<T>) {
    this.api = inject(ApiService);
    this.dialog = inject(MatDialog);
    this.auth = inject(AuthService);
    this.datasource = datasource;
    this.schoolYearService = inject(SchoolYearService);
    this.init();
    console.log(this.constructor.name);
  }

  protected async init() {
    this.schoolYearService.schoolYear.subscribe(async schoolYear => {
      if (schoolYear == null) {
        this.genericBehavioSubject.next(null);
        return;
      }
      this.next = await this.datasource.list(schoolYear);
    });
  }

  get list() {
    return this.genericBehavioSubject.value;
  }

  get stream(): Observable<T[]> {
    return this.objects.pipe(
      filter(objects => objects != null)
    );
  }

  remoteRefresh() {
    this.init();
  }

  localRefresh() {
    this.genericBehavioSubject.next(this.list);
  }

  set next(object: T[]) {
    this.genericBehavioSubject.next(object);
  }

  async one(id: string): Promise<T> {
    return this.datasource.one(id);
  }

  async add(object: T) {
    const newObject = await this.datasource.create(object);
    this.genericBehavioSubject.next([newObject, ...this.genericBehavioSubject.value]);
    return newObject;
  }

  async update(object: T, id: any, idKey: any = '_id') {
    const updatedObject = await this.datasource.update(object, id);
    const objects = this.genericBehavioSubject.value;
    const index = objects.findIndex(o => o[idKey] === updatedObject[idKey]);
    objects[index] = updatedObject;
    this.genericBehavioSubject.next(objects);
    return updatedObject;
  }

  async remove(id: any, key: any = '_id') {
    const dialog = this.dialog.open(CustomizableAlertDialogComponent, {
      data: {
        title: `Attention`,
        body: `Veuillez confirmer afin de procéder à la suppression`,
        actions: [`ANNULER`, `SUPPRIMER`]
      }
    });
    const res = await dialog.afterClosed().toPromise();

    if (res === 1) {
      await this.datasource.remove(id);
      const objects = this.genericBehavioSubject.value;
      const index = objects.findIndex(o => o[key] === id);
      objects.splice(index, 1);
      this.genericBehavioSubject.next(objects);
    }
  }
}
