import {Injectable} from '@angular/core';
import {Common} from './common.util';
import {PrintUtil} from './print.utils';
import {FormUtil} from './form.util';
import {StudentUtil} from './student.util';
import {ExaminationUtil} from './examination.util';


@Injectable()
export class Utils {

  common: Common;
  print: PrintUtil;
  form: FormUtil;
  student: StudentUtil;
  examination: ExaminationUtil;


  constructor(private commonUtil: Common,
              private printUtil: PrintUtil,
              private formUtil: FormUtil,
              private studentUtil: StudentUtil,
              private examinationUtil: ExaminationUtil) {
    this.common = this.commonUtil;
    this.print = this.printUtil;
    this.form = this.formUtil;
    this.student = this.studentUtil;
    this.examination = this.examinationUtil;
  }
}
