import {Classroom} from './classroom';

export class Student {
  '_id'?: string;
  firstname: string;
  lastname: string;
  birthday: string;
  matricule: string;
  gender: string;
  status: string;
  birthCity: string;
  fathersFirstname: string;
  fathersLastname: string;
  mothersFirstname: string;
  mothersLastname: string;
  fathersJob: string;
  mothersJob: string;
  fathersPhone: string;
  mothersPhone: string;
  address: string;
  lastClass: string;
  lastSchool: string;
  createdAt?: Date;
  classroomId?: string;
}
