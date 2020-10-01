import {Student} from './student';
import {SchoolYear} from './school-year';
import {FeeType} from './fee-type';
import {Classroom} from './classroom';
import {PaymentLine} from './payment-line';

export class Payment {
  '_id'?: string = null;
  code ? = '';
  student: string = null;
  '_student'?: Student;
  '_classroom'?: Classroom;
  schoolYear: string = null;
  registrationFee?: FeeType = null;
  schoolFee?: FeeType = null;
  paymentLines: PaymentLine[] = null;
  classroom = '';
  amount = 0;
  paymentDate = '';
  createdAt ? = '';
  updatedAt ? = '';
  school: string;
}
