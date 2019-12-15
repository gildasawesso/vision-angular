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
import {from} from 'rxjs';

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
  totalPaymentsByTranche: Array<number> = [0, 0, 0];

  selected = -1;
  classroomSelected: Classroom;

  get classroomStudents() {
    return this.utils.student.classroomStudents(this.classroomSelected);
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

  selectClassroom(classroom: Classroom, index: number) {
    this.totalPaymentsByTranche =  [0, 0, 0];
    this.selected = index;
    this.classroomSelected = classroom;
  }

  updateTotalPaymentsByTranche(index, amount) {
    this.totalPaymentsByTranche[index] += amount;
  }

  currentStudentRegistrationFeePayedWithReste(student: Student) {
    const payed = this.utils.student.feePaymentsForOneStudent(this.classroomSelected.registrationFee, student);
    const reduction = this.utils.student.feeReduction(student, this.classroomSelected.registrationFee);
    const reste = this.classroomSelected.registrationFee.amount - payed - reduction;
    const allPaymentsDone = reste <= 0;
    return [{
      payed,
      reste,
      reduction,
      allPaymentsDone
    }];
  }

  currentStudentPayments(student: Student) {
    const payments = this.utils.student.feePaymentsForOneStudent(this.classroomSelected.schoolFee, student);
    const reste = this.classroomSelected.schoolFee.amount - payments;
    return [{
      payments,
      reste
    }];
  }

  allStudentPayments(fee: FeeType) {
    return this.utils.student.allSStudentsPayments(this.classroomSelected, fee);
  }

  allPaymentsExpected(fee: FeeType) {
    return fee.amount * this.utils.student.classroomStudents(this.classroomSelected).length;
  }

  tranchesMappedWithPayments(student: Student) {
    let payments = this.utils.student.feePaymentsForOneStudent(this.classroomSelected.schoolFee, student);
    const tranches = this.classroomSelected.schoolFee.tranches;
    return tranches.map((tranche, index) => {
      if (payments >= tranche.amount) {
        payments -= tranche.amount;
        this.updateTotalPaymentsByTranche(index, tranche.amount);
        return {
          ...tranche,
          payed: tranche.amount
        };
      } else {
        if (payments > 0) {
          const payed = payments;
          payments = 0;
          this.updateTotalPaymentsByTranche(index, payed);
          return {
            ...tranche,
            payed
          };
        } else {
          this.updateTotalPaymentsByTranche(index, 0);
          return {
            ...tranche,
            payed: 0
          };
        }
      }
    });
  }

  ngOnInit() {
    this.classroomsRepository.stream
      .subscribe(classrooms => this.classrooms = classrooms);

    this.registrationsRepository.stream
      .subscribe(registrations => this.registrations = registrations);

    this.examinationsRepository.stream
      .subscribe(examinations => this.examinations = examinations);

    this.schoolyearsRepository.stream
      .subscribe(schoolYears => this.schoolYear = schoolYears[0]);

    this.subjectsRepository.stream
      .subscribe(subjects => this.subjects = subjects);

    this.paymentsRepository.stream
      .subscribe(payments => this.payments = payments);
  }

}
