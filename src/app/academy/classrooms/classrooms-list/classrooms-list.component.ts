import {Component, OnInit} from '@angular/core';
import {Classroom} from '../../../core/models/classroom';
import {ClassroomsRepository} from '../../../core/repositories/classrooms.repository';
import {Utils} from '../../../core/shared/utils';
import {AddOrEditClassroomComponent} from '../add-or-edit-classroom/add-or-edit-classroom.component';
import {constants} from '../../../core/constants';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classrooms-list.component.html',
  styleUrls: ['./classrooms-list.component.scss']
})
export class ClassroomsListComponent implements OnInit {

  data;
  mapping = {
    name: 'Nom',
    'append teacher.lastname teacher.firstname': 'Professeur en Charge',
    'schoolFee.name': 'Type de contribution',
    'registrationFee.amount': 'Frais d\'inscription',
    'schoolFee.amount': 'Frais de scolarité',
    options: 'Options'
  };
  optionsPermissions = { edit: constants.permissions.editClassroom, delete: constants.permissions.deleteClassroom };

  constructor(public classroomRepository: ClassroomsRepository,
              private utils: Utils) {
  }

  add() {
    this.utils.common.modal(AddOrEditClassroomComponent, null);
  }

  edit(classroom: Classroom) {
    this.utils.common.modal(AddOrEditClassroomComponent, classroom);
  }

  async delete(classroom: Classroom) {
    const result = await this.utils.common.customAlert('Vous êtes sur le point de supprimer cette classe', 'Attention', ['Annuler', 'Continuer']);

    if (result === 0) { return; }
    await this.classroomRepository.remove(classroom._id);
  }

  ngOnInit() {
    this.classroomRepository.stream
      .subscribe((classrooms: Classroom[]) => {
        this.data = [...classrooms];
      });
  }
}
