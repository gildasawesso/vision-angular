import {Tranche} from './tranche';

export class Fee {
  '_id': string;
  name: string;
  amount: number;
  isSchoolFee: boolean;
  tranches: Tranche[];
  deadline: Date;
}
