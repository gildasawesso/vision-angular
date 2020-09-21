import {Student} from './student';
import {Classroom} from './classroom';
import {SchoolYear} from './school-year';
import {Reduction} from './reduction';

export class Registration {
  '_id'?: string;
  student: Student;
  classroom: Classroom;
  schoolYear: SchoolYear;
  registrationDate: Date;
  isReregistration: boolean;
  isNewStudent?: boolean;
  feesReduction: number;
  registrationFeeReduction: number;
  reductions: Array<Reduction>;
}
