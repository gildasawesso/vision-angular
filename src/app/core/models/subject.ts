import {Teacher} from './teacher';

export class Subject {
  '_id': string;
  code: string;
  name: string;
  teachers: Array<Teacher>;
  markBy: number;
  coefficient: number;
}
