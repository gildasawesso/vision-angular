import {Injectable} from '@angular/core';
import {Payment} from '../../models/payment';
import {FeeType} from '../../models/fee-type';
import {Student} from '../../models/student';
import {Registration} from '../../models/registration';
import {ExaminationsRepository} from '../../repositories/examinations.repository';
import {Examination} from '../../models/examination';
import {Classroom} from '../../models/classroom';

@Injectable()
export class StudentUtil {

  examinations: Examination[] = [];

  constructor(private examinationsRepository: ExaminationsRepository) {
    this.init();
  }

  init() {
    this.examinationsRepository.stream
      .subscribe(examinations => this.examinations = examinations);
  }

  studentPayments(payments: Payment[], student: Student) {
    return payments.filter(p => p.student._id === student._id);
  }

  feeReduction(registrations: Registration[], student: Student, fee: FeeType) {
    const registration = registrations.find(r => r.student._id === student._id);
    if (registration === undefined) { return 0; }

    const reductionForFee = registration.reductions.find(r => r.fee._id === fee._id);
    if (reductionForFee === undefined) { return 0; }

    if (reductionForFee.reductionType === 'percentage') {
      return reductionForFee.fee.amount * reductionForFee.reduction / 100;
    } else {
      return reductionForFee.reduction;
    }
  }

  feePayments(payments: Payment[], fee: FeeType, student: Student) {
    const studentPayments = this.studentPayments(payments, student);
    const subPayments = studentPayments.map(p => p.fees);
    const subPaymentsFlattened = subPayments.reduce((acc, cur) => {
      acc = [...acc, ...cur];
      return acc;
    }, []);
    const feeSubPayments = subPaymentsFlattened.filter(p => p.fee._id === fee._id);
    return feeSubPayments.reduce((acc, cur) => acc + cur.amount, 0);
  }

  classroomExaminations(classroom: Classroom) {
    return this.examinations.filter(e => e.classroom._id === classroom._id);
  }

}