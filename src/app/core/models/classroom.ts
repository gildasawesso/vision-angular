import {Teacher} from './teacher';
import {FeeType} from './fee-type';
import {Subject} from './subject';

export class Classroom {
  '_id': string;
  name: string;
  code: string;
  capacity: number;
  teacher: string;
  registrationFee: string;
  reregistrationFee: string;
  schoolFee: string;
  subjects: Array<Subject>;
  '_registrationFee'?: FeeType;
  '_reRegistrationFee'?: FeeType;
  '_schoolFee'?: FeeType;
  '_subjects'?: Array<Subject>;
  '_teacher'?: Teacher;


  // registrationFee: FeeType | string;
  // reregistrationFee: FeeType | string;
  // schoolFee: FeeType | string;
}
