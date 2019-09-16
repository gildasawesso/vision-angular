import {Student} from './student';
import {SchoolYear} from './school-year';
import {Fee} from './fee';

export class Contribution {
  '_id'?: string;
  student: Student;
  schooYear: SchoolYear;
  fee: Fee;
  amount: number;
}
