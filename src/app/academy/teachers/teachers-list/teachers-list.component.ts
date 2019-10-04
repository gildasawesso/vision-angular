import { Component, OnInit } from '@angular/core';
import {Classroom} from '../../../models/classroom';
import {MatTableDataSource} from '@angular/material';
import {Utils} from '../../../shared/utils';
import {TeachersRepository} from '../../../repositories/teachers.repository';
import {AddOrEditTeacherComponent} from '../add-or-edit-teacher/add-or-edit-teacher.component';
import {Teacher} from '../../../models/teacher';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit {

  constructor(private utils: Utils,
              public teachersRepository: TeachersRepository) { }


  datasource: MatTableDataSource<Classroom>;
  mapping = {
    'append firstname lastname': 'Nom',
    gender: 'Sexe',
    phone: 'Téléphone',
    qualifications: 'Qualifications',
    options: 'Options'
  };

  async add() {
    await this.utils.common.modal(AddOrEditTeacherComponent, { teacher: null });
  }

  async edit(teacher: Teacher) {
    await this.utils.common.modal(AddOrEditTeacherComponent, { teacher });
  }

  delete(teacher: Teacher) {
    console.log(teacher);
  }

  ngOnInit() {
  }

}
