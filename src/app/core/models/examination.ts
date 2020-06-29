import {Subject} from './subject';
import {SchoolYear} from './school-year';
import {ExaminationType} from './examination-type';
import {Mark} from './mark';
import {Classroom} from './classroom';

export interface Examination {
  '_id'?: string;
  classroom: Classroom;
  schoolYear: SchoolYear;
  subject: Subject;
  type: ExaminationType;
  marks?: Array<Mark>;
  examinationDate: Date;
  createdAt?: Date;
}
