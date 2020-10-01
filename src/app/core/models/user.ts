import {Role} from './role';
import {School} from './school';

export class User {
  '_id': string;
  username: string;
  firstname: string;
  lastname: string;
  gender: string;
  job: string;
  address: string;
  phone: string;
  disabled: boolean;
  roles: Array<Role>;
  schools: Array<string> = [];
}
