import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {FeeType} from '../models/fee-type';

@Injectable({
  providedIn: 'root'
})
export class FeeTypesRepository extends BaseRepository<FeeType> {

  constructor() {
    super('/fees');
  }
}
