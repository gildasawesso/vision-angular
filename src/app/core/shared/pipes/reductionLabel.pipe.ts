import { Pipe, PipeTransform } from '@angular/core';
import {FeeType} from '../../models/fee-type';
import {Registration} from '../../models/registration';

@Pipe({
  name: 'reductionLabel',
  pure: false
})
export class ReductionLabelPipe implements PipeTransform {

  transform(feeType: FeeType, ...args: unknown[]): unknown {
    const registration = args[0] as Registration;
    const reduction = registration.reductions.find(r => r.fee._id === feeType._id);
    if (reduction) {
      if (reduction.reductionType === 'percentage') {
        return `${reduction.reduction}%`;
      } else {
        return `-${reduction.reduction} FCFA`;
      }
    } else {
      return 'Pas de réduction';
    }
  }

}
