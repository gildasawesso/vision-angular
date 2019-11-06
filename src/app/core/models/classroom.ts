import {Teacher} from './teacher';
import {FeeType} from './fee-type';
import {Subject} from './subject';

export class Classroom {
  '_id': string;
  name: string;
  code: string;
  capacity: number;
  teacher: Teacher;
  registrationFee: FeeType;
  schoolFee: FeeType;
  subjects: Array<Subject>;
}
