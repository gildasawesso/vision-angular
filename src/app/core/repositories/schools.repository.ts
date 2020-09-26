import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {School} from '../models/school';

@Injectable({
  providedIn: 'root'
})
export class SchoolsRepository extends BaseRepository<School> {

  constructor() {
    super('/schools');
  }
}
