import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Utils} from '../../../shared/utils';
import {SubjectsRepository} from '../../../repositories/subjects.repository';
import {Subject} from '../../../models/subject';
import {AddOrEditSubjectComponent} from '../add-or-edit-subject/add-or-edit-subject.component';

@Component({
  selector: 'app-courses-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss']
})
export class SubjectsListComponent implements OnInit {

  constructor(private utils: Utils,
              public subjectsRepository: SubjectsRepository) { }

  datasource: MatTableDataSource<Subject>;
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

  delete(subject: Subject) {
    console.log(subject);
  }

  ngOnInit() {
  }

}
