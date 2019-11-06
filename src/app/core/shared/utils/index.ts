import {Injectable} from '@angular/core';
import {Common} from './common.util';
import {PrintUtil} from './print.utils';
import {FormUtil} from './form.util';


@Injectable()
export class Utils {

  common: Common;
  print: PrintUtil;
  form: FormUtil;


  constructor(private commonUtil: Common,
              private printUtil: PrintUtil,
              private formUtil: FormUtil) {
    this.common = this.commonUtil;
    this.print = this.printUtil;
    this.form = this.formUtil;
  }
}
