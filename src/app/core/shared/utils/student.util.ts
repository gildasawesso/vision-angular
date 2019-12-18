import {Injectable} from '@angular/core';
import {Payment} from '../../models/payment';
import {FeeType} from '../../models/fee-type';
import {Student} from '../../models/student';
import {Registration} from '../../models/registration';
import {ExaminationsRepository} from '../../repositories/examinations.repository';
import {Examination} from '../../models/examination';
import {Classroom} from '../../models/classroom';
import {SchoolYear} from '../../models/school-year';
import {Common} from './common.util';
import {RegistrationsRepository} from '../../repositories/registrations.repository';
import {PaymentsRepository} from '../../repositories/payments.repository';
import {SchoolyearsRepository} from '../../repositories/schoolyears.repository';

@Injectable()
export class StudentUtil {

  examinations: Examination[] = [];
  registrations: Registration[] = [];
  payments: Payment[] = [];
  currentSchoolYear: SchoolYear;

  constructor(private examinationsRepository: ExaminationsRepository,
              private registrationsRepository: RegistrationsRepository,
              private paymentsRepository: PaymentsRepository,
              private schoolyearsRepository: SchoolyearsRepository,
              private commonUtil: Common) {
    this.init();
  }

  init() {
    this.examinationsRepository.stream.subscribe(examinations => this.examinations = examinations);
    this.registrationsRepository.stream.subscribe(registrations => this.registrations = registrations);
    this.paymentsRepository.stream.subscribe(payments => this.payments = payments);
    this.schoolyearsRepository.selectedSchoolYear.subscribe(schoolYear => this.currentSchoolYear = schoolYear);
  }

  studentPayments(payments: Payment[], student: Student) {
    return payments.filter(p => {
      if (student == null) { return false; }
      return p.student ? p.student._id === student._id : false;
    });
  }

  classroomsAllRegistrationsFeePayments(classroom: Classroom, schoolYear?: SchoolYear) {
    const classroomStudents = this.classroomStudents(classroom);
  }

  allSStudentsPayments(classroom: Classroom, fee?: FeeType, schoolYear?: SchoolYear) {
    const classroomStudents = this.classroomStudents(classroom);
    const payments = classroomStudents.map(s => {
      return this.feePaymentsForOneStudent(fee, s);
    });
    return payments.reduce((acc, cur) => acc + cur, 0);
  }

  allPaymentsExpected(classroom: Classroom, fee?: FeeType, schoolYear?: SchoolYear) {
    const classroomStudents = this.classroomStudents(classroom);
    const payments = classroomStudents.map(s => {
      return this.feePaymentsForOneStudent(fee, s);
    });
    return payments.reduce((acc, cur) => acc + cur, 0);
  }

  studentsRegistration(student: Student) {
    return this.registrations.find(r => r.student ? r.student._id === student._id : false);
  }

  classroomRegistrations(classroom: Classroom) {
    if (classroom == null) { return this.registrations; }
    return this.registrations.filter(r => {
      return r.classroom._id === classroom._id;
    });
  }

  classroomStudents(classroom: Classroom) {
    return this.classroomRegistrations(classroom)
      .filter(r => r.student != null)
      .map(r => r.student)
      .sort(this.commonUtil.dynamicSort('lastname'));
  }

  feeReduction(student: Student, fee: FeeType) {
    const registration = this.studentsRegistration(student);
    if (registration === undefined) { return 0; }

    const reductionForFee = registration.reductions.find(r => r.fee._id === fee._id);
    if (reductionForFee === undefined) { return 0; }

    if (reductionForFee.reductionType === 'percentage') {
      return reductionForFee.fee.amount * reductionForFee.reduction / 100;
    } else {
      return reductionForFee.reduction;
    }
  }

  feePaymentsForOneStudent(fee: FeeType, student: Student) {
    const studentPayments = this.studentPayments(this.payments, student);
    const subPayments = studentPayments.map(p => p.fees);
    const subPaymentsFlattened = subPayments.reduce((acc, cur) => {
      acc = [...acc, ...cur];
      return acc;
    }, []);
    const feeSubPayments = subPaymentsFlattened.filter(p => {
      if (p.fee == null) { return false; }
      return p.fee._id === fee._id;
    });
    return feeSubPayments.reduce((acc, cur) => acc + cur.amount, 0);
  }

  appreciationFromMark(mark: number) {
    switch (true) {
      case mark <= 3.99:
        return 'Très faible';
      case mark <= 7.99:
        return 'Faible';
      case mark <= 9.99:
        return 'Insuffisant';
      case mark <= 11.99:
        return 'Passable';
      case mark <= 13.99:
        return 'Assez-Bien';
      case mark <= 15.99:
        return 'Bien';
      case mark <= 17.99:
        return 'Très Bien';
      case mark <= 20:
        return 'Excellent';
    }
  }

  classroomExaminations(classroom: Classroom) {
    return this.examinations.filter(e => e.classroom._id === classroom._id);
  }
}
