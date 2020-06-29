import {FeeType} from './fee-type';

export class Reduction {
  '_id'?: string;
  fee: FeeType;
  reductionType: string;
  reduction: number;
}
