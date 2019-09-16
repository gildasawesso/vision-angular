import {Injectable} from '@angular/core';
import {Common} from './common.util';


@Injectable({providedIn: 'root'})
export class Utils {

  common: Common;

  constructor(private commonUtil: Common) {
    this.common = this.commonUtil;
  }
}
