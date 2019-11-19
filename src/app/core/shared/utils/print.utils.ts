import {Injectable} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SchoolsRepository} from '../../repositories/schools.repository';
import * as moment from 'moment';
import {ApiService} from '../../services/api.service';
import {Payment} from '../../models/payment';

moment.locale('fr');

@Injectable()
export class PrintUtil {

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private schools: SchoolsRepository,
              private api: ApiService) {
  }

  spaced(value, suffix = '') {
    if (value === undefined || value == null ) { return value; }
    return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + suffix;
  }

  async registrationReceipt(payment: Payment | any) {
    const currentSchool = this.schools.list[0];
    const fees = payment.fees.map((subPayement, index) => {
        return {
          designation: subPayement.fee.name,
          amount: subPayement.fee.amount,
          reduction: Number(subPayement.reduction),
          payed: subPayement.amount,
          balance: subPayement.fee.amount - subPayement.amount - Number(subPayement.reduction),
        };
      });
    const data = {
      code: payment.code,
      createdAt: moment(payment.paymentDate).format('DD MMMM YYYY'),
      schoolYear: moment(payment.schoolYear.startDate).format('YYYY') + ' - ' + moment(payment.schoolYear.endDate).format('YYYY'),
      schoolName: currentSchool.name,
      schoolAddress: currentSchool.zipCode,
      schoolPhone: currentSchool.phone,
      schoolMobile: currentSchool.mobile,
      schoolEmail: currentSchool.email,
      studentFullName: payment.student.firstname + ' ' + payment.student.lastname,
      studentAddress: payment.student.address,
      classroom: payment.classroom.name,
      fees: fees.map((fee, index) => {
        return {
          designation: fee.designation,
          amount: this.spaced(fee.amount),
          reduction: this.spaced(fee.reduction),
          payed: this.spaced(fee.payed),
          balance: this.spaced(fee.balance)
        };
      }),
      totalAmount: this.spaced(fees.reduce((acc, cur) => acc + cur.amount, 0), 'FCFA'),
      totalReduction: this.spaced(fees.reduce((acc, cur) => acc + cur.reduction, 0), 'FCFA'),
      totalPayed: this.spaced(fees.reduce((acc, cur) => acc + cur.payed, 0), 'FCFA'),
      totalBalance: this.spaced(fees.reduce((acc, cur) => acc + cur.balance, 0), 'FCFA'),
    };
    const options = {
      body: data,
      responseType: 'blob'
    };
    const file = await this.api.request('post', '/report/print/registration', options).toPromise();
    console.log(typeof file);

    this.download(file);
  }

  download(blob: Blob) {
    const url = URL.createObjectURL(blob);
    window.open(url);
  }
}


