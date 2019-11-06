import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Subject} from '../models/subject';
import {SubjectsDatasource} from '../datasources/subjects.datasource';

@Injectable({
  providedIn: 'root'
})
export class SubjectsRepository extends BaseRepository<Subject> {

  constructor(private subjectsDatasource: SubjectsDatasource) {
    super(subjectsDatasource);
  }
}
