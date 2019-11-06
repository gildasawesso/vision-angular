import {Tranche} from './tranche';
import {FeeCategory} from './fee-category';

export class FeeType {
  '_id': string;
  name: string;
  amount: number;
  isSchoolFee: boolean;
  tranches: Tranche[];
  deadline: Date;
  feeCategory: FeeCategory;
}
