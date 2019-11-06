import { Injectable } from '@angular/core';
import {Classroom} from '../models/classroom';
import {BaseDatasource} from './base.datasource';

@Injectable({
  providedIn: 'root'
})
export class ClassroomsDatasource extends BaseDatasource<Classroom> {

  constructor() {
    super('/classrooms', 'populate=registrationFee&populate=schoolFee&populate=teacher&populate=subjects');
  }
}
