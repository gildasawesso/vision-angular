import {Teacher} from './teacher';

export class Subject {
  '_id': string;
  code: string;
  name: string;
  professors: Array<Teacher>;
}
