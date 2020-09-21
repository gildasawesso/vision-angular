import {Student} from './student';
import {SchoolYear} from './school-year';
import {FeeType} from './fee-type';
import {Classroom} from './classroom';

export class PaymentLine {
  // tslint:disable-next-line:variable-name
  _id?: string;
  fee: FeeType;
  amount: number;
  createdAt = '';
  updatedAt = '';
}
