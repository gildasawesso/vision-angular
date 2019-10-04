import {ApiService} from '../services/api.service';
import {inject} from '@angular/core';

export abstract class BaseDatasource<T> {

  api: ApiService;

  protected constructor(private url: string, private toPopulate?: string) {
    this.api = inject(ApiService);
  }

  async list() {
    return this.api.get(`${this.url}/${this.toPopulate}`).toPromise<T[]>();
  }

  async one(id) {
    return this.api.get(`${this.url}/${id}${this.toPopulate}`).toPromise();
  }

 async create(object: T) {
    return this.api.post(`${this.url}/${this.toPopulate}`, object).toPromise();
  }

  async update(object: T, id: any) {
    return this.api.patch(`${this.url}/${id}${this.toPopulate}`, object).toPromise();
  }

  async patch(object: any, id: any) {
    return this.api.patch(`${this.url}/${id}${this.toPopulate}`, object).toPromise();
  }

  async remove(id: any) {
    return this.api.delete(`${this.url}/${id}`).toPromise();
  }
}
