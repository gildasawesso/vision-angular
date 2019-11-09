import { Component, OnInit } from '@angular/core';
import {constants} from '../../core/constants';
import {ExaminationsRepository} from '../../core/repositories/examinations.repository';
import {Examination} from '../../core/models/examination';
import {Utils} from '../../core/shared/utils';
import {AddOrEditExaminationComponent} from './add-or-edit-examination/add-or-edit-examination.component';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.scss']
})
export class ExaminationComponent implements OnInit {

  data = [];
  mapping = {
    'date createdAt': 'Date de l\'examen',
    'type.name': 'Type d\'examen',
    'subject.name': 'Matière',
    'classroom.name': 'Classe',
    options: 'Options',
  };
  optionsPermissions = { edit: constants.permissions.editExamination, delete: constants.permissions.deleteExamination };

  constructor(private examinationsRepository: ExaminationsRepository,
              private utils: Utils) { }

  async add() {
    await this.utils.common.modal(AddOrEditExaminationComponent, { examination: null });
  }

  edit(examination: Examination) {

  }

  delete(examination: Examination) {

  }

  ngOnInit() {
    this.examinationsRepository.stream
      .subscribe((examinations: Examination[]) => {
        this.data = [...examinations];
      });
  }

}
