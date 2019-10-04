import { Injectable } from '@angular/core';
import {BaseDatasource} from './base.datasource';
import {Teacher} from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeachersDatasource extends BaseDatasource<Teacher> {

  constructor() {
    super('/teachers', '');
  }
}
