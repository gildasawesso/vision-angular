import { Injectable } from '@angular/core';
import {StudentsRepository} from './students.repository';
import {SchoolsRepository} from './schools.repository';
import {PaymentsRepository} from './payments.repository';
import {RegistrationsRepository} from './registrations.repository';
import {FeeTypesRepository} from './fee-types.repository';
import {ClassroomsRepository} from './classrooms.repository';

@Injectable({
  providedIn: 'root'
})
export class Repositories {
  constructor(public students: StudentsRepository,
              public schools: SchoolsRepository,
              public payments: PaymentsRepository,
              public registrations: RegistrationsRepository,
              public fees: FeeTypesRepository,
              public classrooms: ClassroomsRepository) {
  }
}
