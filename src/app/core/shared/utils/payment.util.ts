import {Injectable} from '@angular/core';
import {FeeType} from '../../models/fee-type';
import {Payment} from '../../models/payment';
import {Reduction} from '../../models/reduction';

@Injectable({
  providedIn: 'root'
})
export class PaymentUtil {

  studentPastPayments(feeId: string, payments: Payment[]) {
    const feePayments = payments.map(p => {
      const paymentLine = p.paymentLines.find(line => line.feeId === feeId);
      return paymentLine ? paymentLine.amount : 0;
    });
    return feePayments.reduce((acc, cur) => acc + cur, 0);
  }

  reduction(fee: FeeType, reductions: Reduction[]) {
    const reduction = reductions.find(r => r.fee === fee._id);
    if (reduction) {
      if (reduction.reductionType === 'percentage') {
        return reduction.reduction / 100 * fee.amount;
      } else {
        return reduction.reduction;
      }
    } else {
      return 0;
    }
  }
  //
  // remainingPayments(fee: FeeType) {
  //   return fee.amount - this.pastPayments(fee) - this.reduction(fee);
  // }
}
