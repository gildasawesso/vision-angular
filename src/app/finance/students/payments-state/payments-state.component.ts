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
  styleUrls: ['./payments-state.component.scss'],
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

  classroomPaymentState(students: Student[]) {
    return students.map(student => this.studentPaymentsState(student));
  }

  studentPaymentsState(student: Student) {
    const {
      registrationFee,
      registrationPayed,
      registrationRemaining,
      registrationIsSold } = this.studentRegistrationState(student);
    const tranches = this.tranchesMappedWithPayments(student);
    const schoolFeePayed = this.utils.student.studentPaymentsForFee(this.classroomSelected.value.schoolFee, student, this.payments);
    const schoolFeeRemaining = this.classroomSelected.value.schoolFee.amount - schoolFeePayed;
    const otherPayments = this.utils.student.studentPaymentsNotMapReduced(this.payments, student, null, true, true);
    const totalPayed = schoolFeePayed + otherPayments;
    const schoolFeeIsRemaining = schoolFeeRemaining > 0;

    return {
      student,
      registrationFee,
      registrationPayed,
      registrationRemaining,
      registrationIsSold,
      tranches,
      schoolFeeRemaining,
      otherPayments,
      schoolFeeIsRemaining,
      totalPayed
    };
  }

  studentRegistrationState(student: Student) {
    const isReRegistration = this.utils.student.studentRegistration(student).isReregistration;
    const registrationFee = isReRegistration ? this.classroomSelected.value.reregistrationFee : this.classroomSelected.value.registrationFee;
    const registrationPayed = this.utils.student.studentPaymentsForFee(registrationFee, student, this.payments);
    const registrationRemaining = registrationFee.amount - registrationPayed;
    const registrationIsSold = registrationRemaining <= 0;

    return {
      registrationFee,
      registrationPayed,
      registrationRemaining,
      registrationIsSold
    };
  }

  headerTotal(classroom: Classroom) {
    const registrationPayments = this.classroomRegistrationFeeAndReregistrationFee(classroom).payments;
    const tranches = this.totalPaymentsByTranche;
    const allSchoolFeePaymentsExpected = this.allPaymentsExpected(classroom.schoolFee);
    const allSchoolFeePaymentsDone = this.allStudentPayments(classroom.schoolFee);
    const allOtherPayments = this.allOtherPayments();
    const schoolFeeRemaining = allSchoolFeePaymentsExpected - allSchoolFeePaymentsDone;
    const allPayments = allSchoolFeePaymentsDone + registrationPayments + allOtherPayments;

    return [{
      registrationPayments,
      tranches,
      allSchoolFeePaymentsExpected,
      allSchoolFeePaymentsDone,
      allOtherPayments,
      schoolFeeRemaining,
      allPayments
    }];
  }

  private classroomRegistrationFeeAndReregistrationFee(classroom: Classroom) {
    const registrationPayments = this.utils.student.classroomPaymentsForFee(classroom.registrationFee, classroom, this.payments);
    const reRegistrationPayments = this.utils.student.classroomPaymentsForFee(classroom.reregistrationFee, classroom, this.payments);
    const registrationPaymentsExpected = this.classroomRegistrationPaymentsExpected(classroom);
    const ReregistrationPaymentsExpected = this.classroomReRegistrationPaymentsExpected(classroom);
    const payments = registrationPayments + reRegistrationPayments;
    const paymentsExpected = registrationPaymentsExpected + ReregistrationPaymentsExpected;
    const areRegistrationsSold = (paymentsExpected - payments) === 0;

    return {
      payments,
      paymentsExpected,
      areRegistrationsSold
    };
  }

  async exportCurrentClassroom() {
    const students = this.classroomStudents;
    const exportData = students.map(student => {
      const registrationState = this.studentRegistrationState(student);
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

  allOtherPayments() {
    const otherPayments = this.utils.student.paymentsNotMapReduced(this.payments, this.classroomSelected.value, null, true);
    return otherPayments.reduce((acc, cur) => acc + cur.amount, 0);
  }

  currentStudentPayments(student: Student) {
    const payments = this.utils.student.studentPaymentsForFee(this.classroomSelected.value.schoolFee, student, this.payments);
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

  allSchoolFeePaymentsExpected(classroom: Classroom) {
    if (classroom == null) { return 0; }
    return classroom.schoolFee.amount * this.utils.student.classroomStudents(classroom).length;
  }

  classroomRegistrationPaymentsExpected(classroom: Classroom) {
    if (classroom.registrationFee == null) { return 0; }
    return classroom.registrationFee.amount * this.utils.student.classroomStudentsRegistered(classroom).length;
  }

  classroomReRegistrationPaymentsExpected(classroom: Classroom) {
    if (classroom.reregistrationFee == null) { return 0; }
    return classroom.reregistrationFee.amount * this.utils.student.classroomStudentsReRegistered(classroom).length;
  }

  tranchesMappedWithPayments(student: Student, classroom?: Classroom) {
    const currentClassroom = classroom ? classroom : this.classroomSelected.value;
    if (currentClassroom == null || currentClassroom.schoolFee == null) { return; }
    let payments = this.utils.student.studentPaymentsForFee(currentClassroom.schoolFee, student, this.payments);
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
      if (acc === undefined) { console.log(this.classroomSelected.value); }
      acc.forEach((value, index) => value.payed += cur[index].payed);
      return acc;
    });
  }

  classroomsPayments(classrooms: Classroom[]) {
    return classrooms.map(classroom => {
      const registrationsInfo = this.classroomRegistrationFeeAndReregistrationFee(classroom);
      const registrationsPayed = registrationsInfo.payments;
      const registrationsExpected = registrationsInfo.paymentsExpected;
      const areRegistrationsSold = registrationsInfo.areRegistrationsSold;
      const tranches = this.classroomTranchesMappedWithPayments(classroom);
      const schoolFeePayed = this.utils.student.classroomPaymentsForFee(classroom.schoolFee, classroom, this.payments);
      const schoolFeeRemaining = this.allSchoolFeePaymentsExpected(classroom) - schoolFeePayed;
      const otherPayments = this.utils.student.classroomPaymentsForFee(null, classroom, this.payments, true);
      const totalPayed = schoolFeePayed + otherPayments;
      const areSchoolFeesSold = schoolFeeRemaining <= 0;

      return {
        registrationsPayed,
        registrationsExpected,
        areRegistrationsSold,
        classroom: classroom.name,
        tranches,
        schoolFeeRemaining,
        otherPayments,
        totalPayed,
        areSchoolFeesSold
      };
    });
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

  ngOnInit() {
    this.classroomsRepository.stream.subscribe(classrooms => {
      this.classrooms = classrooms;
      this.defaultClassroom = classrooms.find(c => c.schoolFee != null && c.schoolFee.tranches != null && c.schoolFee.tranches.length > 0);
    });
    this.registrationsRepository.stream.subscribe(registrations => this.registrations = registrations);
    this.paymentsRepository.stream.subscribe(payments => this.payments = payments);
    this.examinationsRepository.stream.subscribe(examinations => this.examinations = examinations);
    this.schoolyearsRepository.stream.subscribe(schoolYears => this.schoolYear = schoolYears[0]);
    this.subjectsRepository.stream.subscribe(subjects => this.subjects = subjects);
    this.classroomSelected.valueChanges
      .subscribe((classroom: Classroom) => {
        if (classroom == null) { return; }
        this.totalPaymentsByTranches();
      });
  }
}
