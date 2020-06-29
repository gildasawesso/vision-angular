import { Component, OnInit } from '@angular/core';
import {Utils} from '../../../core/shared/utils';
import {TeachersRepository} from '../../../core/repositories/teachers.repository';
import {AddOrEditTeacherComponent} from '../add-or-edit-teacher/add-or-edit-teacher.component';
import {Teacher} from '../../../core/models/teacher';
import {constants} from '../../../core/constants';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit {

  constructor(private utils: Utils,
              public teachersRepository: TeachersRepository) { }


  data;
  mapping = {
    'append firstname lastname': 'Nom',
    gender: 'Sexe',
    phone: 'Téléphone',
    qualifications: 'Qualifications',
    options: 'Options'
  };
  optionsPermissions = { edit: constants.permissions.editTeacher, delete: constants.permissions.deleteTeacher };

  async add() {
    await this.utils.common.modal(AddOrEditTeacherComponent, { teacher: null });
  }

  async edit(teacher: Teacher) {
    await this.utils.common.modal(AddOrEditTeacherComponent, { teacher });
  }

  async delete(teacher: Teacher) {
    const result = await this.utils.common.customAlert('Vous êtes sur le point de supprimer ce professeur', 'Attention', ['Annuler', 'Continuer']);

    if (result === 0) { return; }
    await this.teachersRepository.remove(teacher._id);
  }

  ngOnInit() {
    this.teachersRepository.stream
      .subscribe((teachers: Teacher[]) => {
        this.data = [...teachers];
      });
  }

}
