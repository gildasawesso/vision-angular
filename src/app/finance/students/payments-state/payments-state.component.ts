import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ClassroomsRepository} from '../../../core/repositories/classrooms.repository';
import {RegistrationsRepository} from '../../../core/repositories/registrations.repository';
import {ExaminationsRepository} from '../../../core/repositories/examinations.repository';
import {SchoolyearsRepository} from '../../../core/repositories/schoolyears.repository';
import {SubjectsRepository} from '../../../core/repositories/subjects.repository';
import {Utils} from '../../../core/shared/utils';
import {Classroom} from '../../../core/models/classroom';
import {Registration} from '../../../core/models/registration';
import {Subject} from '../../../core/models/subject';
import {SchoolYear} from '../../../core/models/school-year';
import {Examination} from '../../../core/models/examination';
import {Student} from '../../../core/models/student';
import {PaymentsRepository} from '../../../core/repositories/payments.repository';
import {Payment} from '../../../core/models/payment';
import {FeeType} from '../../../core/models/fee-type';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-payments-state',
  templateUrl: './payments-state.component.html',
  styleUrls: ['./payments-state.component.scss']
})
export class PaymentsStateComponent implements OnInit {

  classrooms: Classroom[] = [];
  registrations: Registration[] = [];
  subjects: Subject[] = [];
  schoolYear: SchoolYear;
  examinations: Examination[] = [];
  payments: Payment[] = [];
  totalPaymentsByTranche: Array<any>;
  defaultClassroom: Classroom;
  exportExcelHeader = [
    'Nom',
    'Prénom',
    'Montant Inscriptions',
    'Montant Inscriptions Payé',
    'Réductions Inscriptions',
    'Inscriptions Reste à payer',
    'Payement Total',
    'Reste à Payer'
  ];

  selected = -1;
  classroomSelected = new FormControl(null);

  get classroomStudents() {
    return this.utils.student.classroomStudents(this.classroomSelected.value);
  }

  constructor(private classroomsRepository: ClassroomsRepository,
              private registrationsRepository: RegistrationsRepository,
              private examinationsRepository: ExaminationsRepository,
              private schoolyearsRepository: SchoolyearsRepository,
              private subjectsRepository: SubjectsRepository,
              private paymentsRepository: PaymentsRepository,
              public utils: Utils,
              private changeDetector: ChangeDetectorRef) {
  }

  async exportCurrentClassroom() {
    const students = this.classroomStudents;
    const exportData = students.map(student => {
      const registrationState = this.currentStudentRegistrationFeePayedWithReste(student);
      const schoolFeeState = this.tranchesMappedWithPayments(student, this.classroomSelected.value);
      const payments = this.currentStudentPayments(student);
      const schoolFeeStates: any = {};
      schoolFeeState.forEach(s => {
        schoolFeeStates[s.name] = s.amount;
        schoolFeeStates[`${s.name}Payed`] = s.payed;
        schoolFeeStates[`${s.name}Reduction`] = 0;
        schoolFeeStates[`${s.name}remaining`] = s.amount - s.payed;
      });

      return {
        firstname: student.firstname,
        lastname: student.lastname,
        registrationFee: this.classroomSelected.value.registrationFee.amount,
        registrationFeePayed: registrationState[0].payed,
        registrationFeeReduction: registrationState[0].reduction,
        registrationFeeRemaining: registrationState[0].reste,
        TotalSchoolFeePayments: payments[0].payments,
        ...schoolFeeStates,
        TotalPaymentsRemaining: payments[0].reste
      };
    });
    await this.exportExcel(exportData, this.exportExcelHeader);
  }

  async exportExcel(data: any, header?: any) {
    await this.utils.print.excel(data, header);
  }

  currentStudentRegistrationFeePayedWithReste(student: Student) {
    const isReRegistration = this.utils.student.studentsRegistration(student).isReregistration;
    const fee = isReRegistration ? this.classroomSelected.value.reregistrationFee : this.classroomSelected.value.registrationFee;
    const payed = this.utils.student.feePaymentsForOneStudent(this.payments, fee, student);
    const reduction = this.utils.student.feeReduction(student, fee);
    const reste = fee.amount - payed - reduction;
    const allPaymentsDone = reste <= 0;
    return [{
      fee,
      payed,
      reste,
      reduction,
      allPaymentsDone
    }];
  }

  allOtherPayments() {
    const otherPayments = this.utils.student.paymentsNotMapReduced(this.payments, this.classroomSelected.value, null, true);
    return otherPayments.reduce((acc, cur) => acc + cur.amount, 0);
  }

  currentStudentPayments(student: Student) {
    const payments = this.utils.student.feePaymentsForOneStudent(this.payments, this.classroomSelected.value.schoolFee, student);
    const reste = this.classroomSelected.value.schoolFee.amount - payments;
    const otherPayments = this.utils.student.studentPaymentsNotMapReduced(this.payments, student, null, true, true);
    const currentStudentAllPayments = payments + otherPayments;

    return [{
      payments,
      reste,
      otherPayments,
      currentStudentAllPayments
    }];
  }

  allStudentPayments(fee: FeeType) {
    return this.utils.student.allStudentsPaymentsForClassroom(this.payments, this.classroomSelected.value, fee);
  }

  allPaymentsExpected(fee: FeeType) {
    if (fee == null) { return 0; }
    return fee.amount * this.utils.student.classroomStudents(this.classroomSelected.value).length;
  }

  allRegistrationPaymentsExpected(classroom: Classroom) {
    if (classroom.registrationFee == null) { return 0; }
    return classroom.registrationFee.amount * this.utils.student.classroomRegisterStudents(classroom).length;
  }

  allReregistrationPaymentsExpected(classroom: Classroom) {
    if (classroom.reregistrationFee == null) { return 0; }
    return classroom.reregistrationFee.amount * this.utils.student.classroomReRegisterStudents(classroom).length;
  }

  tranchesMappedWithPayments(student: Student, classroom?: Classroom) {
    const currentClassroom = classroom ? classroom : this.classroomSelected.value;
    let payments = this.utils.student.feePaymentsForOneStudent(this.payments, currentClassroom.schoolFee, student);
    const tranches = currentClassroom.schoolFee.tranches;
    return tranches.map(tranche => {
      if (payments >= tranche.amount) {
        payments -= tranche.amount;
        return {
          ...tranche,
          payed: tranche.amount
        };
      } else {
        if (payments > 0) {
          const payed = payments;
          payments = 0;
          return {
            ...tranche,
            payed
          };
        } else {
          return {
            ...tranche,
            payed: 0
          };
        }
      }
    });
  }

  otherPayments(student: Student) {
    return this.utils.student.studentPaymentsNotMapReduced(this.payments, student, null, false, true);
  }

  totalPaymentsByTranches() {
    const students = this.utils.student.classroomStudents(this.classroomSelected.value);
    if (students == null) {
      return;
    }
    const studentsByTranches = students.map(student => {
      return this.tranchesMappedWithPayments(student, this.classroomSelected.value);
    });
    if (studentsByTranches.length <= 0) {
      return [{
        payed: 0
      }];
    }
    this.totalPaymentsByTranche = studentsByTranches.reduce((acc, cur) => {
      acc.forEach((value, index) => value.payed += cur[index].payed);
      return acc;
    });
  }


  classroomRegistrationFeeAndReregistrationFee(classroom: Classroom) {
    const registrationPayments = this.utils.student.classroomPayments(this.payments, classroom, classroom.registrationFee);
    const ReregistrationPayments = this.utils.student.classroomPayments(this.payments, classroom, classroom.reregistrationFee);
    const registrationPaymentsExpected = this.allRegistrationPaymentsExpected(classroom);
    const ReregistrationPaymentsExpected = this.allReregistrationPaymentsExpected(classroom);
    const payments = registrationPayments + ReregistrationPayments;
    const paymentsExpected = registrationPaymentsExpected + ReregistrationPaymentsExpected;
    const allPaymentsDone = (paymentsExpected - payments) === 0;

    return [{
      payments,
      paymentsExpected,
      allPaymentsDone
    }];
  }

  classroomTranchesMappedWithPayments(classroom: Classroom) {
    const students = this.utils.student.classroomStudents(classroom);
    if (students == null) {
      return;
    }
    const studentsByTranches = students.map(student => {
      return this.tranchesMappedWithPayments(student, classroom);
    });
    if ( studentsByTranches.length <= 0) {
      return [{
        payed: 0
      }];
    }

    return studentsByTranches.reduce((acc, cur) => {
      acc.forEach((value, index) => value.payed += cur[index].payed);
      return acc;
    });
  }

  ClassroomPayments(classroom: Classroom) {
    if (classroom.schoolFee == null) {
      return [{
        payments: 0,
        reste: 0,
        otherPayments: 0,
        currentClassroomAllPayments: 0,
      }];
    }
    const payments = this.utils.student.classroomPayments(this.payments, classroom, classroom.schoolFee);
    const reste = this.allPaymentsExpected(classroom.schoolFee) - payments;
    const otherPayments = this.utils.student.classroomPayments(this.payments, classroom, null, true);
    const currentClassroomAllPayments = payments + otherPayments;

    return [{
      payments,
      reste,
      otherPayments,
      currentClassroomAllPayments
    }];
  }

  ngOnInit() {
    this.classroomsRepository.stream.subscribe(classrooms => {
      this.classrooms = classrooms;
      this.defaultClassroom = classrooms.find(c => c.schoolFee != null && c.schoolFee.tranches != null && c.schoolFee.tranches.length > 0);
    });
    this.registrationsRepository.stream.subscribe(registrations => this.registrations = registrations);
    this.examinationsRepository.stream.subscribe(examinations => this.examinations = examinations);
    this.schoolyearsRepository.stream.subscribe(schoolYears => this.schoolYear = schoolYears[0]);
    this.subjectsRepository.stream.subscribe(subjects => this.subjects = subjects);
    this.paymentsRepository.stream.subscribe(payments => this.payments = payments);
    this.classroomSelected.valueChanges
      .subscribe((classroom: Classroom) => {
        this.totalPaymentsByTranches();
      });
  }

}
