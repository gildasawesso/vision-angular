import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Subject} from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectsRepository extends BaseRepository<Subject> {

  constructor() {
    super('/subjects');
  }
}
