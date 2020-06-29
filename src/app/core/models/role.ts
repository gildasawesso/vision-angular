import {Permission} from './permission';

export class Role {
  '_id': string;
  name: string;
  permissions: Array<Permission>;
}
