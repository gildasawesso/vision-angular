import {Teacher} from './teacher';
import {FeeType} from './fee-type';
import {Subject} from './subject';

export class Classroom {
  '_id': string;
  name: string;
  code: string;
  capacity: number;
  teacher: Teacher;
  registrationFee: string;
  reregistrationFee: string;
  schoolFee: string;
  subjects: Array<Subject>;


  // registrationFee: FeeType | string;
  // reregistrationFee: FeeType | string;
  // schoolFee: FeeType | string;
}
