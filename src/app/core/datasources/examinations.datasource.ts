import { Injectable } from '@angular/core';
import {BaseDatasource} from './base.datasource';
import {Examination} from '../models/examination';
import {SchoolYearService} from '../services/school-year.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExaminationsDatasource extends BaseDatasource<Examination> {

  constructor(private schoolYearService: SchoolYearService) {
    super('/examinations');
  }

  async list(): Promise<Examination[]> {
    return this.schoolYearService.schoolYearSelected.pipe(
      map(schoolYear => super.list(schoolYear._id))
    ).toPromise();
  }

  updateStudents(examination: Examination) {
    return this.api.patch(`${this.url}/${examination._id}/marks`, examination).toPromise();
  }
}
