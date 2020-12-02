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
import {Reduction} from '../../models/reduction';

@Injectable()
export class StudentUtil {

  examinations: Examination[] = [];
  registrations: Registration[] = [];
  payments: Payment[] = [];
  classrooms: Classroom[] = [];
  currentSchoolYear: SchoolYear;
  classroomPayments = {};

  constructor(private commonUtil: Common) {

  }

  sortFn(s1: Student, s2: Student) {
    return s1.lastname.localeCompare(s2.lastname);
  }

  allStudents(allPayments: Payment[], schoolYear?: SchoolYear) {
    return this.registrations.filter(r => r.schoolYear._id === this.currentSchoolYear._id);
  }

  studentRegistration(student: Student) {
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

  allStudentsPaymentsWithOtherPayments(payments: Payment[], schoolYear?: SchoolYear) {
    const subPayments = payments.map(payment => payment.paymentLines);
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
