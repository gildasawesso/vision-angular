import { Injectable } from '@angular/core';
import {BaseDatasource} from './base.datasource';
import {Registration} from '../models/registration';
import {SchoolyearsRepository} from '../repositories/schoolyears.repository';

@Injectable({
  providedIn: 'root'
})
export class RegistrationsDatasource extends BaseDatasource<Registration> {

  constructor(private schoolyearRepository: SchoolyearsRepository) {
    super('/registrations');
  }

  async list(): Promise<Registration[]> {
    const allRegistrations = await super.list();
    const currentSchoolYear = await this.schoolyearRepository.list[0];
    return allRegistrations.filter(r => {
      if (r.schoolYear === undefined || r.schoolYear == null) { return; }
      return r.schoolYear._id === currentSchoolYear._id;
    });
  }
}
