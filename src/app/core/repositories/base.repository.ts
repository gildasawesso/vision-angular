/**
 * Created by gildas on 4/15/2018.
 */

import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {inject} from '@angular/core';
import {BaseDatasource} from '../datasources/base.datasource';
import { MatDialog } from '@angular/material/dialog';
import {CustomizableAlertDialogComponent} from '../shared/components/customizable-alert-dialog/customizable-alert-dialog.component';
import {filter} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {SchoolYear} from '../models/school-year';

export abstract class BaseRepository<T> extends BaseDatasource<T>{

  protected genericBehaviorSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>(null);
  private objects: Observable<T[]> = this.genericBehaviorSubject.asObservable();

  private dialog: MatDialog;
  protected auth: AuthService;

  protected constructor(protected basePath: string) {
    super(basePath);
    this.dialog = inject(MatDialog);
    this.auth = inject(AuthService);
    this.init();
  }

  protected async load(schoolYear: SchoolYear) {
    this.next = await this.list(schoolYear);
  }

  protected async init() {
    this.schoolYearService.schoolYear.subscribe(async schoolYear => {
      if (schoolYear == null) {
        this.genericBehaviorSubject.next(null);
        return;
      }
      this.next = await this.list(schoolYear);
    });
  }

  get snapshot() {
    return this.genericBehaviorSubject.value;
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
    this.genericBehaviorSubject.next(this.snapshot);
  }

  set next(object: T[]) {
    this.genericBehaviorSubject.next(object);
  }

  async one(id: string): Promise<T> {
    return this.getOne(id);
  }

  async add(object: T) {
    const newObject = await this.post(object);
    this.genericBehaviorSubject.next([newObject, ...this.genericBehaviorSubject.value]);
    return newObject;
  }

  async update(object: T, id: any, idKey: any = '_id') {
    const updatedObject = await this.patch(object, id);
    const objects = this.genericBehaviorSubject.value;
    const index = objects.findIndex(o => o[idKey] === updatedObject[idKey]);
    objects[index] = updatedObject;
    this.genericBehaviorSubject.next(objects);
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
      await this.delete(id);
      const objects = this.genericBehaviorSubject.value;
      const index = objects.findIndex(o => o[key] === id);
      objects.splice(index, 1);
      this.genericBehaviorSubject.next(objects);
    }
  }
}

// combineLatest([this.genericBehaviorSubject.asObservable(), this.schoolYearService.schoolYear])
//   .subscribe(([objects, schoolYear]: [T[], SchoolYear]) => {
//     if (schoolYear != null) {
//       this.load(schoolYear);
//     }
//   });
