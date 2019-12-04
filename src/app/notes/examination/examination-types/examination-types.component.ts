import { Component, OnInit } from '@angular/core';
import {ExaminationType} from '../../../core/models/examination-type';
import {AddOrEditExaminationTypeComponent} from '../add-or-edit-examination-type/add-or-edit-examination-type.component';
import {ExaminationTypesRepository} from '../../../core/repositories/examinationTypes.repository';
import {Utils} from '../../../core/shared/utils';
import {constants} from '../../../core/constants';

@Component({
  selector: 'app-examination-types',
  templateUrl: './examination-types.component.html',
  styleUrls: ['./examination-types.component.scss']
})
export class ExaminationTypesComponent implements OnInit {

  constants = constants;
  examinationTypes: ExaminationType[] = [];

  constructor(private examinationTypesRepository: ExaminationTypesRepository,
              private utils: Utils) { }

  async addExaminationType() {
    const examinationType: ExaminationType = await this.utils.common.modalWithResult(AddOrEditExaminationTypeComponent, { type: null });
    if (examinationType) {
      await this.examinationTypesRepository.add(examinationType);
    }
  }

  async editExaminationType(type: ExaminationType) {
    const examinationType = await this.utils.common.modalWithResult(AddOrEditExaminationTypeComponent, { type });
    if (examinationType != null) {
      await this.examinationTypesRepository.update(examinationType, type._id);
    }
  }

  async deleteExamType(type: ExaminationType) {
    const res = await this.utils.common.customAlert('Toutes les examinations liées à ce type d\'examination seront supprimées', 'Attention', ['Annuler', 'Je comprends le risque']);
    if (res === 1) {
      await this.examinationTypesRepository.remove(type._id);
    }
  }

  ngOnInit() {
    this.examinationTypesRepository.stream
      .subscribe((examinationTypes: ExaminationType[]) => {
        this.examinationTypes = examinationTypes;
      });
  }

}
