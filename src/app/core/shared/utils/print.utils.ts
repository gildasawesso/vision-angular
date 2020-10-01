import {Injectable} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import {Repositories} from '../../repositories/repositories';
import {PaymentUtil} from './payment.util';
import {Reduction} from '../../models/reduction';
import {SchoolYearService} from '../../services/school-year.service';
import {PaymentLine} from '../../models/payment-line';
import {WorkService} from '../../services/work.service';

moment.locale('fr');

@Injectable()
export class PrintUtil {

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private api: ApiService,
              private studentUtils: StudentUtil,
              private commonUtils: Common,
              private paymentUtil: PaymentUtil,
              private repo: Repositories,
              private schoolYearService: SchoolYearService,
              private work: WorkService) {
  }

  private spaced(value, suffix = '') {
    if (value === undefined || value == null ) { return value; }
    return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + suffix;
  }

  async bulletin(notes) {

    const options = {
      body: this.processNotes(notes),
      responseType: 'blob'
    };
    const file = await this.api.request('post', `/report/print/bulletin-${notes.examinationsTypes.length}-notes`, options).toPromise();

    this.download(file);
  }

  processNotes(notes) {
    return notes;
    // const currentSchool = this.schools.list[0];
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

      examinationTypes: notes.examinationsTypes,
      classSize: notes.classSize,
      director: 'ATROKPOCODJI',
      isLastSession: notes.isLastSession,
      // todo get date from server
      printingDate: moment().format('DD MMMM YYYY'),
      generalAppreciation: this.studentUtils.appreciationFromMark(Number(generalMean)),
      // status: isReRegistration ? 'Doublant' : 'Passant',
      status: '',
      generalMeanInLetter: this.commonUtils.decimalToLetter(generalMean),
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
      annualMean: notes.annualMean,
      annualRank: notes.annualRank,
      congratulations: Number(generalMean) >= 14 ? 'X' : '',
      encouragement: parseInt(generalMean, 10) === 13 ? 'X' : '',
      honor: parseInt(generalMean, 10) === 12 ? 'X' : '',
      warning: Number(generalMean) < 7 ? 'X' : '',
      blame,
      finalStatement: notes.finalStatement,
      excluded: blameSubjectMark.meanByTwenty < 9 ? 'X' : '',
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
      console.log(notes);
      return this.processNotes(notes);
    });

    const options = {
      body: notesArrayProccessed,
      responseType: 'blob'
    };
    const file = await this.api.request('post', `/report/print/multiple`, options).toPromise();

    this.download(file);
  }

  async registrationReceipt(payment: Payment) {
    this.work.started(`Impresssion de la facture en cours`);
    const student = await this.repo.students.one(payment.student);
    const classroom = await this.repo.classrooms.one(payment.classroom);
    const school = await this.repo.schools.one(payment.school);
    const studentPayments: Payment[] = await this.repo.payments.studentPayments(payment.student);
    const studentReductions: Reduction[] = await this.repo.registrations.studentReductions(payment.student);
    const schoolYear = await this.schoolYearService.snapshot;

    const paymentLines: any[] = await Promise.all(payment.paymentLines.map(async (line, index) => {
      const fee = await this.repo.fees.one(line.fee);
      const pastPayments = this.paymentUtil.studentPastPayments(fee._id, studentPayments);
      const reduction = this.paymentUtil.reduction(fee, studentReductions);
      return {
        designation: fee.name,
        amount: fee.amount,
        reduction,
        payed: line.amount,
        oldPayments: pastPayments - line.amount,
        balance: fee.amount - (reduction + pastPayments),
      };
    }));
    const data = {
      code: payment.code,
      createdAt: payment.paymentDate ? moment(payment.paymentDate).format('DD MMMM YYYY') : moment(payment.createdAt).format('DD MMMM YYYY'),
      schoolYear: moment(schoolYear.startDate).format('YYYY') + ' - ' + moment(schoolYear.endDate).format('YYYY'),
      schoolName: school.name,
      schoolAddress: school.zipCode,
      schoolPhone: school.phone,
      schoolMobile: school.mobile,
      schoolEmail: school.email,
      studentFullName: student.firstname + ' ' + student.lastname,
      studentAddress: student.address ?? '',
      classroom: classroom.name,
      fees: paymentLines.map((line, index) => {
        return {
          designation: line.designation,
          amount: this.spaced(line.amount),
          reduction: this.spaced(line.reduction),
          payed: this.spaced(line.payed),
          oldPayments: this.spaced(line.oldPayments),
          balance: this.spaced(line.balance)
        };
      }),
      totalAmount: this.spaced(paymentLines.reduce((acc, cur) => acc + cur.amount, 0), 'FCFA'),
      totalReduction: this.spaced(paymentLines.reduce((acc, cur) => acc + cur.reduction, 0), 'FCFA'),
      totalPayed: this.spaced(paymentLines.reduce((acc, cur) => acc + cur.payed, 0), 'FCFA'),
      totalOldPayments: this.spaced(paymentLines.reduce((acc, cur) => acc + cur.oldPayments, 0), 'FCFA'),
      totalBalance: this.spaced(paymentLines.reduce((acc, cur) => acc + cur.balance, 0), 'FCFA'),
    };
    const options = {
      body: data,
      responseType: 'blob'
    };
    const file = await this.api.request('post', '/report/print/registration', options).toPromise();

    this.download(file);
    this.work.ended();
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
}


