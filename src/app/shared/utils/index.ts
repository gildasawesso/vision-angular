import {Injectable} from '@angular/core';
import {Common} from './common.util';
import {PrintUtil} from './print.utils';


@Injectable()
export class Utils {

  common: Common;
  print: PrintUtil;

  constructor(private commonUtil: Common,
              private printUtil: PrintUtil) {
    this.common = this.commonUtil;
    this.print = this.printUtil;
  }
}
