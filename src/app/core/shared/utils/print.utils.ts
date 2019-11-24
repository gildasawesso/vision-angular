import {Injectable} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SchoolsRepository} from '../../repositories/schools.repository';
import * as moment from 'moment';
import {ApiService} from '../../services/api.service';
import {Payment} from '../../models/payment';
import {FeeType} from '../../models/fee-type';
import {PaymentsRepository} from '../../repositories/payments.repository';
import {Student} from '../../models/student';
import {RegistrationsRepository} from '../../repositories/registrations.repository';

moment.locale('fr');

@Injectable()
export class PrintUtil {

  private payments = [];
  private registrations = [];

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private schools: SchoolsRepository,
              private api: ApiService,
              private paymentsRepository: PaymentsRepository,
              private registrationsRepository: RegistrationsRepository) {
    this.loadRepositories();
  }

  private spaced(value, suffix = '') {
    if (value === undefined || value == null ) { return value; }
    return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + suffix;
  }

  private studentPayments(student: Student) {
    return this.payments.filter(p => p.student._id === student._id);
  }

  private feeReduction(student: Student, fee: FeeType) {
    console.log(this.registrations);
    const registration = this.registrations.find(r => r.student._id === student._id);
    if (registration === undefined) { return 0; }

    const reductionForFee = registration.reductions.find(r => r.fee._id === fee._id);
    if (reductionForFee === undefined) { return 0; }

    if (reductionForFee.reductionType === 'percentage') {
      return reductionForFee.fee.amount * reductionForFee.reduction / 100;
    } else {
      return reductionForFee.reduction;
    }
  }

  private paymentsForFee(oldPayments: Payment[], fee: FeeType) {
    const subPayments = oldPayments.map(p => p.fees);
    const subPaymentsFlattened = subPayments.reduce((acc, cur) => {
      acc = [...acc, ...cur];
      return acc;
    }, []);
    const feeSubPayments = subPaymentsFlattened.filter(p => p.fee._id === fee._id);
    return feeSubPayments.reduce((acc, cur) => acc + cur.amount, 0);
  }

  async bulletin(notes) {
    const currentSchool = this.schools.list[0];
    const data = {
      matricule: notes.student.matricule,
      schoolName: currentSchool.name,
      studentFullName: notes.student.firstname + ' ' + notes.student.lastname,
      term: notes.term,
      schoolYear: moment(notes.schoolYear.startDate).format('YYYY') + ' - ' + moment(notes.schoolYear.endDate).format('YYYY'),
      classroom: notes.classroom.name,
      subjects: notes.subjects.map(subjectAndExaminationType => {
        const marks = {};
        subjectAndExaminationType.examinationsByType.forEach((s, index) => {
          marks[`mark${index + 1}`] = s.marks;
        });
        return {
          name: subjectAndExaminationType.subject.name,
          meanByTwenty: subjectAndExaminationType.meanByTwenty.toFixed(2),
          coef: subjectAndExaminationType.coef,
          rank: subjectAndExaminationType.rank,
          firstRankMean: subjectAndExaminationType.firstRankMean.toFixed(2),
          lastRankMean: subjectAndExaminationType.lastRankMean,
          meanByCoefficient: subjectAndExaminationType.meanByCoefficient.toFixed(2),
          ...marks
        };
      })
    };

    const options = {
      body: data,
      responseType: 'blob'
    };
    console.log(options.body);
    const file = await this.api.request('post', '/report/print/bulletin', options).toPromise();

    this.download(file);
  }

  async registrationReceipt(payment: Payment | any) {
    const currentSchool = this.schools.list[0];
    const studentPayments = this.studentPayments(payment.student);

    const fees = payment.fees.map((subPayement, index) => {
      const oldPayment = this.paymentsForFee(studentPayments, subPayement.fee) - subPayement.amount;
      const reduction = this.feeReduction(payment.student, subPayement.fee);
      return {
          designation: subPayement.fee.name,
          amount: subPayement.fee.amount,
          reduction,
          payed: subPayement.amount,
          oldPayments: oldPayment,
          balance: subPayement.fee.amount - subPayement.amount - reduction - oldPayment,
        };
      });
    const data = {
      code: payment.code,
      createdAt: payment.paymentDate ? moment(payment.paymentDate).format('DD MMMM YYYY') : moment(payment.createdAt).format('DD MMMM YYYY'),
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
          oldPayments: this.spaced(fee.oldPayments),
          balance: this.spaced(fee.balance)
        };
      }),
      totalAmount: this.spaced(fees.reduce((acc, cur) => acc + cur.amount, 0), 'FCFA'),
      totalReduction: this.spaced(fees.reduce((acc, cur) => acc + cur.reduction, 0), 'FCFA'),
      totalPayed: this.spaced(fees.reduce((acc, cur) => acc + cur.payed, 0), 'FCFA'),
      totalOldPayments: this.spaced(fees.reduce((acc, cur) => acc + cur.oldPayments, 0), 'FCFA'),
      totalBalance: this.spaced(fees.reduce((acc, cur) => acc + cur.balance, 0), 'FCFA'),
    };
    const options = {
      body: data,
      responseType: 'blob'
    };
    const file = await this.api.request('post', '/report/print/registration', options).toPromise();

    this.download(file);
  }

  private download(blob: Blob) {
    const url = URL.createObjectURL(blob);
    window.open(url);
  }

  private loadRepositories() {
    this.paymentsRepository.stream
      .subscribe(payments => {
        this.payments = payments;
      });

    this.registrationsRepository.stream
      .subscribe(registrations => {
        this.registrations = registrations;
      });
  }
}


