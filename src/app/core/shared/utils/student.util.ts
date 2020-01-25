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
import {ClassroomsRepository} from '../../repositories/classrooms.repository';

@Injectable()
export class StudentUtil {

  examinations: Examination[] = [];
  registrations: Registration[] = [];
  payments: Payment[] = [];
  classrooms: Classroom[] = [];
  currentSchoolYear: SchoolYear;
  classroomPayments = {};

  constructor(private examinationsRepository: ExaminationsRepository,
              private registrationsRepository: RegistrationsRepository,
              private paymentsRepository: PaymentsRepository,
              private schoolyearsRepository: SchoolyearsRepository,
              private classroomsRepository: ClassroomsRepository,
              private commonUtil: Common) {
    this.init();
  }

  init() {
    this.examinationsRepository.stream.subscribe(examinations => this.examinations = examinations);
    this.registrationsRepository.stream.subscribe(registrations => this.registrations = registrations);
    this.paymentsRepository.stream.subscribe(payments => this.payments = payments);
    this.schoolyearsRepository.selectedSchoolYear.subscribe(schoolYear => this.currentSchoolYear = schoolYear);
    this.classroomsRepository.stream.subscribe(classrooms => this.classrooms = classrooms);
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

  allStudentsPaymentsForClassroom(allPayments: Payment[], classroom: Classroom, fee?: FeeType, schoolYear?: SchoolYear) {
    const classroomStudents = this.classroomStudents(classroom);
    const payments = classroomStudents.map(s => {
      return this.studentPaymentsForFee(fee, s, allPayments);
    });
    return payments.reduce((acc, cur) => acc + cur, 0);
  }

  // todo je ne dois en aucun cas utiliser la classroomId du payement
  classroomPaymentsForFee(fee: FeeType, classroom: Classroom, allPayments: Payment[], onlyOtherPayments = false, schoolYear?: SchoolYear) {
    if (fee != null && this.classroomPayments[classroom._id] && this.classroomPayments[classroom._id][fee._id]) {
      return this.classroomPayments[classroom._id][fee._id];
    } else if (fee == null && this.classroomPayments[classroom._id] && this.classroomPayments[classroom._id].other) {
      return this.classroomPayments[classroom._id].other;
    } else {
      const payments = allPayments.filter(p => this.isPaymentForClassroom(classroom, p)).map(p => p.fees);
      const paymentsFlattened = onlyOtherPayments ?
        this.flatSubPayments(payments).filter(p => p.fee._id !== classroom.registrationFee._id && p.fee._id !== classroom.schoolFee._id && p.fee._id !== classroom.reregistrationFee._id)
        : this.flatSubPayments(payments).filter(p => p.fee._id === fee._id);
      const paymentsWithoutReductions = paymentsFlattened.reduce((acc, cur) => acc + cur.amount, 0);
      const classroomReductions = this.classroomReductionsForFee(fee, classroom);

      if (allPayments.length > 0) {
        if (!this.classroomPayments[classroom._id]) { this.classroomPayments[classroom._id] = {}; }
        if (fee != null) {
          this.classroomPayments[classroom._id][fee._id] = paymentsWithoutReductions + classroomReductions;
        } else {
          this.classroomPayments[classroom._id].other = paymentsWithoutReductions + classroomReductions;
        }
      }
      return paymentsWithoutReductions + classroomReductions;
    }
  }

  paymentsNotMapReduced(allPayments: Payment[], classroom: Classroom, fee?: FeeType, onlyOtherPayments = false, schoolYear?: SchoolYear) {
    const payments = allPayments.filter(p => p.classroom._id === classroom._id).map(p => p.fees);
    return onlyOtherPayments ?
      this.flatSubPayments(payments).filter(p => p.fee._id !== classroom.registrationFee._id && p.fee._id !== classroom.schoolFee._id && p.fee._id !== classroom.reregistrationFee._id)
      : this.flatSubPayments(payments).filter(p => p.fee._id === fee._id);
  }

  studentPaymentsNotMapReduced(allPayments: Payment[], student?: Student, fee?: FeeType, reduce = false, onlyOtherPayments = false, schoolYear?: SchoolYear) {
    const studentRegistration = this.studentRegistration(student);
    const payments = this.studentPayments(allPayments, student).map(p => p.fees);
    const filteredPayments = onlyOtherPayments ?
      this.flatSubPayments(payments).filter(p => p.fee._id
        !== studentRegistration.classroom.registrationFee._id && p.fee._id
        !== studentRegistration.classroom.schoolFee._id && p.fee._id
        !== studentRegistration.classroom.reregistrationFee._id)
      : this.flatSubPayments(payments).filter(p => p.fee._id === fee._id);

    if (reduce) {
      return filteredPayments.reduce((acc, cur) => acc + cur.amount, 0);
   } else {
      return filteredPayments;
   }
  }

  allStudents(allPayments: Payment[], schoolYear?: SchoolYear) {
    return this.registrations.filter(r => r.schoolYear._id === this.currentSchoolYear._id);
  }

  allStudentsRegistrationsPayments(allPayments: Payment[], schoolYear?: SchoolYear) {
    const paymentsPerClassroom = this.classrooms.map(classroom => this.classroomPaymentsForFee(classroom.registrationFee, classroom, allPayments));
    return paymentsPerClassroom.reduce((acc, cur) => acc + cur, 0);
  }

  allStudentsReRegistrationsPayments(allPayments: Payment[], schoolYear?: SchoolYear) {
    const paymentsPerClassroom = this.classrooms.map(classroom => this.classroomPaymentsForFee(classroom.reregistrationFee, classroom, allPayments));
    return paymentsPerClassroom.reduce((acc, cur) => acc + cur, 0);
  }

  allStudentsSchoolFeesPayments(allPayments: Payment[], schoolYear?: SchoolYear) {
    const paymentsPerClassroom = this.classrooms.map(classroom => this.classroomPaymentsForFee(classroom.schoolFee, classroom, allPayments));
    return paymentsPerClassroom.reduce((acc, cur) => acc + cur, 0);
  }

  allStudentsOtherFeesPayments(allPayments: Payment[], schoolYear?: SchoolYear) {
    const paymentsPerClassroom = this.classrooms.map(classroom => this.classroomPaymentsForFee(null, classroom, allPayments, true));
    return paymentsPerClassroom.reduce((acc, cur) => acc + cur, 0);
  }

  studentOtherFeesPayments(allPayments: Payment[], classroom: Classroom, student: Student, schoolYear?: SchoolYear) {
    return this.paymentsNotMapReduced(allPayments, classroom, null, true);
  }

  allPaymentsExpected(classroom: Classroom, allPayments: Payment[], fee?: FeeType, schoolYear?: SchoolYear) {
    const classroomStudents = this.classroomStudents(classroom);
    const payments = classroomStudents.map(s => {
      return this.studentPaymentsForFee(fee, s, allPayments);
    });
    return payments.reduce((acc, cur) => acc + cur, 0);
  }

  studentRegistration(student: Student) {
    return this.registrations.find(r => r.student ? r.student._id === student._id : false);
  }

  paymentClassroom(payment: Payment) {
    const registration = this.studentRegistration(payment.student);
    if (registration === undefined) { return null; }
    return registration.classroom;
  }

  isPaymentForClassroom(classroom: Classroom, payment: Payment) {
    return this.paymentClassroom(payment) ? this.paymentClassroom(payment)._id === classroom._id : false;
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

  classroomStudentsRegistered(classroom: Classroom) {
    return this.classroomRegistrations(classroom)
      .filter(r => r.student != null && !r.isReregistration)
      .map(r => r.student)
      .sort(this.commonUtil.dynamicSort('lastname'));
  }

  classroomStudentsReRegistered(classroom: Classroom) {
    return this.classroomRegistrations(classroom)
      .filter(r => r.student != null && r.isReregistration)
      .map(r => r.student)
      .sort(this.commonUtil.dynamicSort('lastname'));
  }

  studentReductionsForFee(fee: FeeType, student: Student) {
    const registration = this.studentRegistration(student);
    if (registration === undefined) { return 0; }

    const reductionForFee = registration.reductions.find(r => fee != null ? r.fee._id === fee._id : false);
    if (reductionForFee === undefined) { return 0; }

    if (reductionForFee.reduction === undefined || reductionForFee.reduction == null) { return 0; }

    if (reductionForFee.reductionType === 'percentage') {
      return reductionForFee.fee.amount * reductionForFee.reduction / 100;
    } else {
      return reductionForFee.reduction;
    }
  }

  classroomReductionsForFee(fee: FeeType, classroom) {
    const students = this.classroomStudents(classroom);
    return students.map(student => {
      return this.studentReductionsForFee(fee, student);
    }).reduce((acc, cur) => acc + cur, 0);
  }

  studentPaymentsForFee(fee: FeeType, student: Student, payments: Payment[]) {
    const studentPayments = this.studentPayments(payments, student);
    const subPayments = studentPayments.map(p => p.fees);
    const subPaymentsFlattened = this.flatSubPayments(subPayments);
    const feeSubPayments = subPaymentsFlattened.filter(p => {
      if (p.fee == null) { return false; }
      return p.fee._id === fee._id;
    });
    const feePaymentsAmount = feeSubPayments.reduce((acc, cur) => acc + cur.amount, 0);
    const reductions = this.studentReductionsForFee(fee, student);
    return feePaymentsAmount + reductions;
  }

  allStudentsPaymentsWithOtherPayments(payments: Payment[], schoolYear?: SchoolYear) {
    const subPayments = payments.map(payment => payment.fees);
    const subPaymentsFlattened = subPayments.reduce((acc, cur) => {
      acc = [...acc, ...cur];
      return acc;
    }, []);
    return subPaymentsFlattened.reduce((acc, cur) => acc + cur.amount, 0);
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

  flatSubPayments(fees) {
    return fees.reduce((acc, cur) => {
      acc = [...acc, ...cur];
      return acc;
    }, []);
  }
}
