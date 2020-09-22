import {ApiService} from '../services/api.service';
import {inject} from '@angular/core';
import {SchoolYearService} from '../services/school-year.service';
import {SchoolYear} from '../models/school-year';

export abstract class BaseDatasource<T> {

  api: ApiService;
  schoolYearService: SchoolYearService;

  schoolYear: SchoolYear;

  protected constructor(protected url: string, protected toPopulate: string = '') {
    this.api = inject(ApiService);
    this.schoolYearService = inject(SchoolYearService);
    this.schoolYearService.schoolYearSelected.subscribe(sy => this.schoolYear = sy);
  }

  async list(schoolYearId?: string) {
    return this.api.get(`${this.url}?schoolyear=${this.schoolYear._id}`).toPromise<T[]>();
  }

  async one(id) {
    return this.api.get(`${this.url}/?${id}${this.toPopulate}`).toPromise();
  }

 async create(object: T) {
    return this.api.post(`${this.url}/?${this.toPopulate}x=0&schoolyear=${this.schoolYear._id}`, object).toPromise();
  }

  async update(object: T, id: any) {
    return this.api.patch(`${this.url}/${id}?${this.toPopulate}`, object).toPromise();
  }

  async patch(object: any, id: any) {
    return this.api.patch(`${this.url}/${id}?${this.toPopulate}`, object).toPromise();
  }

  async remove(id: any) {
    return this.api.delete(`${this.url}/${id}`).toPromise();
  }
}
