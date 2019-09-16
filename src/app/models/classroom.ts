import {Teacher} from './teacher';
import {Fee} from './fee';
import {Subject} from './subject';

export class SchoolClass {
  // tslint:disable-next-line:variable-name
  _id: string;
  name: string;
  code: string;
  capacity: number;
  teacher: Teacher;
  fee: Fee;
  subjects: Array<Subject>;
}
