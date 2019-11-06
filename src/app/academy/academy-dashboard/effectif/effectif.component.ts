import {Component, Input, OnInit} from '@angular/core';
import {StudentsRepository} from '../../../core/repositories/students.repository';
import {map} from 'rxjs/operators';
import {RegistrationsRepository} from '../../../core/repositories/registrations.repository';

@Component({
  selector: 'app-effectif',
  templateUrl: './effectif.component.html',
  styleUrls: ['./effectif.component.scss']
})
export class EffectifComponent implements OnInit {

  data;
  labels = ['Garçon', 'Fille'];

  constructor(private studentsRepository: StudentsRepository,
              private registrationsRepository: RegistrationsRepository) { }

  ngOnInit() {
    this.data = this.registrationsRepository.genders(null)
      .pipe(
        map(genders => {
          return [genders.male, genders.female];
        })
      );
  }
}
