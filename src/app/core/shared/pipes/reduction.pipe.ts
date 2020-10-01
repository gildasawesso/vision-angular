import { Pipe, PipeTransform } from '@angular/core';
import {Registration} from '../../models/registration';
import {FeeType} from '../../models/fee-type';

@Pipe({
  name: 'reduction',
  pure: false
})
export class ReductionPipe implements PipeTransform {

  transform(feeType: FeeType, ...args: unknown[]): number {
    const registration = args[0] as Registration;
    const reduction = registration.reductions.find(r => r.fee === feeType._id);
    if (reduction) {
      if (reduction.reductionType === 'percentage') {
        return reduction.reduction / 100 * feeType.amount;
      } else {
        return reduction.reduction;
      }
    } else {
      return 0;
    }
  }

}
