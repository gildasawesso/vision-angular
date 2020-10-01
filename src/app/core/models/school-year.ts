import {SchoolSession} from './school-session';

export class SchoolYear {
  '_id': string;
  startDate: Date;
  endDate: Date;
  sessions: Array<SchoolSession>;
  school: string;
}
