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
import {StudentUtil} from './student.util';
import {Common} from './common.util';

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
              private registrationsRepository: RegistrationsRepository,
              private studentUtils: StudentUtil,
              private commonUtils: Common) {
    this.loadRepositories();
  }

  private spaced(value, suffix = '') {
    if (value === undefined || value == null ) { return value; }
    return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + suffix;
  }

  private studentPayments(student: Student) {
    return this.studentUtils.studentPayments(this.payments, student);
  }

  private feeReduction(student: Student, fee: FeeType) {
    const registration = this.studentUtils.studentRegistration(student);
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

    const options = {
      body: this.processNotes(notes),
      responseType: 'blob'
    };
    const file = await this.api.request('post', `/report/print/bulletin-${notes.examinationsTypes.length}-notes${notes.isLastSession ? '-endyear' : ''}`, options).toPromise();

    this.download(file);
  }

  processNotes(notes) {
    const currentSchool = this.schools.list[0];
    const examTypes = {};
    const isReRegistration = this.studentUtils.studentRegistration(notes.student).isReregistration;
    const totalCoef = notes.subjects.reduce((acc, cur) => acc + cur.coef, 0);
    const totalPoints = notes.subjects.reduce((acc, cur) => acc + Number(cur.meanByCoefficient), 0).toFixed(2);
    const generalMean = (Number(totalPoints) / Number(totalCoef)).toFixed(2);
    let blame = '';
    const blameSubjectMark = notes.subjects.find(s => s.subject.name.split(' ')[0].toLowerCase() === 'conduite');
    if (blameSubjectMark) {
      const blameMeanByTwenty = blameSubjectMark.meanByTwenty;
      blame = blameMeanByTwenty < 10 ? 'X' : '';
    }
    notes.examinationsTypes.forEach((e, index) => {
      examTypes[`examType${index + 1}`] = e;
    });
    return {
      matricule: notes.student.matricule,
      schoolName: currentSchool.name,
      schoolSubName: currentSchool.subName,
      isLastSession: notes.isLastSession,
      schoolSessions: notes.schoolSessions,
      annualMean: notes.annualMean,
      sex: notes.student.gender,
      examinationTypes: notes.examinationsTypes,
      classSize: notes.classSize,
      director: 'ATROKPOCODJI',
      // todo get date from server
      printingDate: moment().format('DD MMMM YYYY'),
      generalAppreciation: this.studentUtils.appreciationFromMark(Number(generalMean)),
      // status: isReRegistration ? 'Doublant' : 'Passant',
      status: '',
      generalMeanInLetter: this.commonUtils.decimalToLetter(generalMean),
      studentFullName: notes.student.firstname + ' ' + notes.student.lastname,
      term: notes.term.toUpperCase(),
      schoolYear: moment(notes.schoolYear.startDate).format('YYYY') + ' - ' + moment(notes.schoolYear.endDate).format('YYYY'),
      classroom: notes.classroom.name,
      ...examTypes,
      totalPoints,
      totalCoef,
      mainRank: notes.mainRank,
      bestClassroomMean: notes.bestClassroomMean,
      lastClassroomMean: notes.lastClassroomMean,
      generalMean,
      annualRank: notes.annualRank,
      congratulations: Number(generalMean) >= 14 ? 'X' : '',
      encouragement: parseInt(generalMean, 10) === 13 ? 'X' : '',
      honor: parseInt(generalMean, 10) === 12 ? 'X' : '',
      warning: Number(generalMean) < 7 ? 'X' : '',
      blame,
      subjects: notes.subjects.map(subjectAndExaminationType => {
        const marks = {};
        subjectAndExaminationType.examinationsByType.forEach((s, index) => {
          marks[`mark${index + 1}`] = s.marks === undefined || s.marks == null ? '-' : s.marks;
        });
        return {
          name: subjectAndExaminationType.subject.code,
          meanByTwenty: subjectAndExaminationType.meanByTwenty >= 0 ? subjectAndExaminationType.meanByTwenty.toFixed(2) : '-',
          coef: subjectAndExaminationType.meanByTwenty >= 0 ? subjectAndExaminationType.coef : '-',
          rank: subjectAndExaminationType.meanByTwenty >= 0 ? subjectAndExaminationType.rank : '-',
          firstRankMean: subjectAndExaminationType.firstRankMean.toFixed(2),
          lastRankMean: subjectAndExaminationType.lastRankMean.toFixed(2),
          meanByCoefficient: subjectAndExaminationType.meanByTwenty >= 0 ? subjectAndExaminationType.meanByCoefficient.toFixed(2) : '-',
          appreciation : subjectAndExaminationType.meanByTwenty >= 0 ? subjectAndExaminationType.appreciation : '',
          ...marks
        };
      })
    };
  }

  async classroomBulletin(notesArray) {
    const notesArrayProccessed = notesArray.map(notes => {
      return this.processNotes(notes);
    });

    const options = {
      body: notesArrayProccessed,
      responseType: 'blob'
    };
    const file = await this.api.request('post', `/report/print/multiple`, options).toPromise();

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

  async excel(data, header?) {
    const options = {
      body: { data, header },
      responseType: 'blob'
    };
    const file = await this.api.request('post', `/report/print/excel`, options).toPromise();

    this.download(file);
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


