import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Utils} from '../../../core/shared/utils';
import {SubjectsRepository} from '../../../core/repositories/subjects.repository';
import {Subject} from '../../../core/models/subject';
import {AddOrEditSubjectComponent} from '../add-or-edit-subject/add-or-edit-subject.component';

@Component({
  selector: 'app-courses-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss']
})
export class SubjectsListComponent implements OnInit {

  constructor(private utils: Utils,
              public subjectsRepository: SubjectsRepository) { }

  data;
  mapping = {
    name: 'Nom',
    code: 'Code de la matière',
    'array teachers lastname': 'Enseignants',
    options: 'Options'
  };

  async add() {
    await this.utils.common.modal(AddOrEditSubjectComponent, { subject: null });
  }

  async edit(subject: Subject) {
    await this.utils.common.modal(AddOrEditSubjectComponent, { subject });
  }

  async delete(subject: Subject) {
    const result = await this.utils.common.customAlert('Vous êtes sur le point de supprimer un cours', 'Attention', ['Annuler', 'Continuer']);

    if (result === 0) { return; }
    await this.subjectsRepository.remove(subject._id);
  }

  ngOnInit() {
    this.subjectsRepository.stream
      .subscribe((subjects: Subject[]) => {
        this.data = [...subjects];
      });
  }

}
