/**
 * Created by gildas on 4/15/2018.
 */

import {BehaviorSubject, Observable} from 'rxjs';
import {ApiService} from '../services/api.service';
import {inject} from '@angular/core';
import {BaseDatasource} from '../datasources/base.datasource';

export abstract class BaseRepository<T> {

  protected genericBehavioSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  private objects: Observable<T[]> = this.genericBehavioSubject.asObservable();

  private api: ApiService;
  protected datasource: BaseDatasource<T>;

  protected constructor(datasource: BaseDatasource<T>) {
    this.api = inject(ApiService);
    this.datasource = datasource;
    this.init();
  }

  protected async init() {
    const data = await this.datasource.list();
    this.genericBehavioSubject.next(data);
  }

  get list() {
    return this.genericBehavioSubject.value;
  }

  get stream(): Observable<T[]> {
    return this.objects;
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
    await this.datasource.remove(id);
    const objects = this.genericBehavioSubject.value;
    const index = objects.findIndex(o => o[key] === id);
    objects.splice(index, 1);
    this.genericBehavioSubject.next(objects);
  }
}
