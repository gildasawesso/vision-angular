import {Injectable} from '@angular/core';
import {FeeType} from '../../models/fee-type';

@Injectable()
export class PaymentUtil {

  // pastPayments(fee: FeeType,) {
  //   if (this.studentPayments === undefined ) { return 0; }
  //
  //   const feePayments = this.studentPayments.map(p => {
  //     const paymentLine = p.fees.find(f => f.fee._id === fee._id);
  //     return paymentLine ? paymentLine.amount : 0;
  //   });
  //   return feePayments.reduce((acc, cur) => acc + cur, 0);
  // }
  //
  // reduction(fee: FeeType) {
  //   if (this.registration.reductions === undefined || this.registration.reductions == null) { return 0; }
  //   const reduction = this.registration.reductions.find(r => r.fee._id === fee._id);
  //   if (reduction) {
  //     if (reduction.reductionType === 'percentage') {
  //       return reduction.reduction / 100 * fee.amount;
  //     } else {
  //       return reduction.reduction;
  //     }
  //   } else {
  //     return 0;
  //   }
  // }
  //
  // remainingPayments(fee: FeeType) {
  //   return fee.amount - this.pastPayments(fee) - this.reduction(fee);
  // }
}
