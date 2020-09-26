import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Teacher} from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeachersRepository extends BaseRepository<Teacher> {

  constructor() {
    super('/teachers');
  }
}
