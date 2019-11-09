import {Student} from './student';
import {Classroom} from './classroom';
import {SchoolYear} from './school-year';

export class Registration {
  '_id'?: string;
  student: Student;
  classroom: Classroom;
  schoolYear: SchoolYear;
  registrationDate: Date;
  isReregistration: boolean;
}
