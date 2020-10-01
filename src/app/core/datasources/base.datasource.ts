import {ApiService} from '../services/api.service';
import {inject} from '@angular/core';
import {SchoolYearService} from '../services/school-year.service';
import {SchoolYear} from '../models/school-year';

export abstract class BaseDatasource<T> {

  private api: ApiService;
  schoolYearService: SchoolYearService;
  schoolYear: SchoolYear;

  protected constructor(protected url: string) {
    this.api = inject(ApiService);
    this.schoolYearService = inject(SchoolYearService);
    this.schoolYearService.schoolYear.subscribe(sy => this.schoolYear = sy);
  }

  get query() {
    return {
      get: (path: string, queryParams?: string) => {
        const params = queryParams ? `&${queryParams}` : '';
        return this.api.get(`${this.url}${path}?schoolyear=${this.schoolYear._id}${params}`).toPromise();
      },
      post: (path: string, data: any, queryParams?: string) => {
        const params = queryParams ? `&${queryParams}` : '';
        return this.api.post(`${this.url}${path}?schoolyear=${this.schoolYear._id}${params}`, data).toPromise();
      }
    };
  }

  async list(schoolYear?: SchoolYear) {
    if (schoolYear) {
      return this.api.get(`${this.url}?schoolyear=${schoolYear?._id}`).toPromise<T[]>();
    }
    return this.api.get(`${this.url}`).toPromise<T[]>();
  }

  async getOne(id) {
    return this.api.get(`${this.url}/${id}?schoolyear=${this.schoolYear._id}`).toPromise();
  }

 async post(object: T) {
    return this.api.post(`${this.url}/?schoolyear=${this.schoolYear._id}`, object).toPromise();
  }

  async patch(object: T, id: any) {
    return await this.api.patch(`${this.url}/${id}?schoolyear=${this.schoolYear._id}`, object).toPromise();
  }

  async delete(id: any) {
    return this.api.delete(`${this.url}/${id}?schoolyear=${this.schoolYear._id}`).toPromise();
  }
}
