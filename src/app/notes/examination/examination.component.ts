import {Component, OnInit} from '@angular/core';
import {constants} from '../../core/constants';
import {ExaminationsRepository} from '../../core/repositories/examinations.repository';
import {Examination} from '../../core/models/examination';
import {Utils} from '../../core/shared/utils';
import {AddOrEditExaminationComponent} from './add-or-edit-examination/add-or-edit-examination.component';
import {AddOrEditExaminationTypeComponent} from './add-or-edit-examination-type/add-or-edit-examination-type.component';
import {ExaminationTypesRepository} from '../../core/repositories/examinationTypes.repository';
import {ExaminationType} from '../../core/models/examination-type';
import {MarksComponent} from './marks/marks.component';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.scss']
})
export class ExaminationComponent implements OnInit {

  examinationTypes: ExaminationType[] = [];
  data = [];
  mapping = {
    'date createdAt': 'Date de l\'examen',
    'classroom.name': 'Classe',
    'type.name': 'Type d\'examen',
    'subject.name': 'Matière',
    notes: 'Notes',
    options: 'Options',
  };
  optionsPermissions = { edit: constants.permissions.editExamination, delete: constants.permissions.deleteExamination };

  constructor(private examinationsRepository: ExaminationsRepository,
              private examinationTypesRepository: ExaminationTypesRepository,
              private utils: Utils) { }

  async add() {
    await this.utils.common.modal(AddOrEditExaminationComponent, { examination: null });
  }

  edit(examination: Examination) {

  }

  async delete(examination: Examination) {
    const res = await this.utils.common.customAlert('L\'examination sera supprimée définitivement', 'Attention', ['Annuler', 'Je comprends']);
    if (res) {
      await this.examinationsRepository.remove(examination._id);
    }
  }

  openNotesPage(examination: Examination) {
    this.utils.common.modal(MarksComponent, { examination }, true);
  }

  async addExaminationType() {
    const examinationTypeName: any = await this.utils.common.modalWithResult(AddOrEditExaminationTypeComponent, { type: null });
    const examinationType: any = {
      name: examinationTypeName
    };
    await this.examinationTypesRepository.add(examinationType);
  }

  async editExaminationType(type: ExaminationType) {
    type.name = await this.utils.common.modalWithResult(AddOrEditExaminationTypeComponent, {type: null});
    await this.examinationTypesRepository.update(type, type._id);
  }

  async deleteExamType(type: ExaminationType) {
    const res = await this.utils.common.customAlert('Toutes les examinations liées à ce type d\'examination seront supprimées', 'Attention', ['Annuler', 'Je comprends le risque']);
    if (res === 1) {
      await this.examinationTypesRepository.remove(type._id);
    }
  }

  ngOnInit() {
    this.examinationsRepository.stream
      .subscribe((examinations: Examination[]) => {
        console.log(examinations);
        this.data = [...examinations];
      });

    this.examinationTypesRepository.stream
      .subscribe((examinationTypes: ExaminationType[]) => {
        this.examinationTypes = examinationTypes;
      });
  }

}
