import {Teacher} from './teacher';
import {Fee} from './fee';
import {Subject} from './subject';

export class Classroom {
  '_id': string;
  name: string;
  code: string;
  capacity: number;
  teacher: Teacher;
  registrationFee: Fee;
  schoolFee: Fee;
  subjects: Array<Subject>;
}
