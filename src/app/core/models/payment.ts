import {Student} from './student';
import {SchoolYear} from './school-year';
import {FeeType} from './fee-type';
import {Classroom} from './classroom';

export class Payment {
  '_id'?: string = null;
  student: Student = null;
  schoolYear: SchoolYear = null;
  registrationFee?: FeeType = null;
  schoolFee?: FeeType = null;
  fees: Array<{fee: FeeType, amount: number, reduction?: number, reductionType?: string}> = null;
  classroom: Classroom = null;
  amount = 0;
  paymentDate = '';
  createdAt = '';
  updatedAt = '';
}
