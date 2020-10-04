import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ClassroomsRepository} from '../../core/repositories/classrooms.repository';
import {RegistrationsRepository} from '../../core/repositories/registrations.repository';
import {ExaminationsRepository} from '../../core/repositories/examinations.repository';
import {SchoolyearsRepository} from '../../core/repositories/schoolyears.repository';
import {SubjectsRepository} from '../../core/repositories/subjects.repository';
import {Utils} from '../../core/shared/utils';
import {Classroom} from '../../core/models/classroom';
import {Registration} from '../../core/models/registration';
import {Subject} from '../../core/models/subject';
import {SchoolYear} from '../../core/models/school-year';
import {Examination} from '../../core/models/examination';
import {Student} from '../../core/models/student';
import {PaymentsRepository} from '../../core/repositories/payments.repository';
import {Payment} from '../../core/models/payment';
import {FeeType} from '../../core/models/fee-type';
import {FormControl} from '@angular/forms';
import {Repositories} from '../../core/repositories/repositories';
import {Services} from '../../core/services/services';

@Component({
  selector: 'app-payments-state',
  templateUrl: './payments-state.component.html',
  styleUrls: ['./payments-state.component.scss'],
})
export class PaymentsStateComponent implements OnInit {

  classrooms: Classroom[] = [];
  registrations: Registration[] = [];
  classroomSelectedStudents: Student[];
  classroomSelectedState: any;
  tranchesName: string[];
  paymentsState: any;


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
              private repo: Repositories,
              private serevices: Services,
              private changeDetector: ChangeDetectorRef) {
  }

  async exportCurrentClassroom() {
    // const students = this.classroomStudents;
    // const exportData = students.map(student => {
    //   const registrationState = this.studentRegistrationState(student);
    //   const schoolFeeState = this.tranchesMappedWithPayments(student, this.classroomSelected.value);
    //   const payments = this.currentStudentPayments(student);
    //   const schoolFeeStates: any = {};
    //   schoolFeeState.forEach(s => {
    //     schoolFeeStates[s.name] = s.amount;
    //     schoolFeeStates[`${s.name} Payée`] = s.payed;
    //     schoolFeeStates[`Réduction ${s.name}`] = 0;
    //     schoolFeeStates[`${s.name} restant`] = s.amount - s.payed;
    //   });
    //
    //   return {
    //     Prénom: student.firstname,
    //     Nom: student.lastname,
    //     'Frais d\'inscription': this.classroomSelected.value.registrationFee.amount,
    //     'Inscription payé': registrationState.registrationPayed,
    //     'Réduction frais d\'inscription': 0,
    //     'Frais d\'inscription restant': registrationState.registrationRemaining,
    //     'Frais de scolarité': payments[0].payments,
    //     ...schoolFeeStates,
    //     'Scolarité totale restante': payments[0].reste
    //   };
    // });
    // await this.exportExcel(exportData);
  }

  async exportExcel(data: any, header?: any) {
    await this.utils.print.excel(data, header);
  }

  ngOnInit() {
    this.repo.classrooms.stream.subscribe(classrooms => this.classrooms = classrooms);

    this.repo.fees.stream.subscribe(fees => {
      this.tranchesName = fees.find(f => f.tranches.length >= 2).tranches.map(tranche => tranche.name);
    });

    this.repo.payments.state.subscribe(state => {
      this.paymentsState = state;
    });
    this.registrationsRepository.stream.subscribe(registrations => this.registrations = registrations);
    this.classroomSelected.valueChanges
      .subscribe((classroomId: string) => {
        if (classroomId == null) { return; }
        this.classroomSelectedStudents = this.registrations
          .filter(registration => registration.classroom._id === classroomId)
          .map(registration => registration.student);
        this.classroomSelectedState = this.paymentsState.classrooms[classroomId];
      });
  }
}
