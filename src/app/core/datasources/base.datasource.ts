/**
 * Created by gildas on 4/15/2018.
 */

import {BehaviorSubject, Observable} from 'rxjs';
import {ApiService} from '../services/api.service';

export abstract class BaseRepository<T> {

  protected genericBehavioSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  private objects: Observable<T[]> = this.genericBehavioSubject.asObservable();

  protected constructor(api: ApiService, private url: string) {
    this.init(api, url);
  }

  private init(api, url) {
    api.get(url)
      .subscribe((data: any[]) => {
        this.genericBehavioSubject.next(data);
      });
  }

  get(): Observable<T[]> {
    return this.objects;
  }

  add(object: T) {
    const o = this.genericBehavioSubject.getValue().slice();
    o.unshift(object);
    this.genericBehavioSubject.next(o);
  }

  update(oldObject: T, newObject: T) {
    const index = this.genericBehavioSubject.value.findIndex(o => o == oldObject);
    const objects = [...this.genericBehavioSubject.value];
    objects[index] = newObject;
    this.genericBehavioSubject.next(objects);
  }

  updateBy(key: any, updatedObject: T) {
    const objects = [...this.genericBehavioSubject.value];
    const index = objects.findIndex(o => o[key] === updatedObject[key]);
    console.log(index);
    objects[index] = updatedObject;
    this.genericBehavioSubject.next(objects);
  }

  remove(object: T) {
    const index = this.genericBehavioSubject.getValue().findIndex(o => o == object);
    const o = this.genericBehavioSubject.getValue().slice();
    o.splice(index, 1);
    this.genericBehavioSubject.next(o);
  }
}
