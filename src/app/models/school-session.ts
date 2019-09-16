import {SchoolYear} from './school-year';

export class SchoolSession {
  '_id': string;
  name: string;
  startDate: Date;
  endDate: Date;
  schoolYear: SchoolYear;
}
