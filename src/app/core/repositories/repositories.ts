import { Injectable } from '@angular/core';
import {StudentsRepository} from './students.repository';
import {SchoolsRepository} from './schools.repository';
import {PaymentsRepository} from './payments.repository';
import {RegistrationsRepository} from './registrations.repository';
import {FeeTypesRepository} from './fee-types.repository';
import {ClassroomsRepository} from './classrooms.repository';
import {TransactionsRepository} from './transactions.repository';
import {TransactionTypesRepository} from './transaction-types.repository';
import {ExaminationsRepository} from './examinations.repository';
import {ExaminationTypesRepository} from './examinationTypes.repository';
import {TeachersRepository} from './teachers.repository';
import {SubjectsRepository} from './subjects.repository';

@Injectable({
  providedIn: 'root'
})
export class Repositories {
  constructor(public students: StudentsRepository,
              public schools: SchoolsRepository,
              public payments: PaymentsRepository,
              public registrations: RegistrationsRepository,
              public fees: FeeTypesRepository,
              public classrooms: ClassroomsRepository,
              public transactions: TransactionsRepository,
              public exams: ExaminationsRepository,
              public examTypes: ExaminationTypesRepository,
              public teachers: TeachersRepository,
              public subjects: SubjectsRepository,
              public transactionTypes: TransactionTypesRepository) {
  }
}
