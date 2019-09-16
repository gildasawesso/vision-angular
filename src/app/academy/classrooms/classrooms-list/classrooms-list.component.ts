import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Classroom} from '../../../models/classroom';
import {ClassroomsRepository} from '../../../core/repositories/classrooms.repository';
import {Utils} from '../../../shared/utils';
import {AddOrEditClassroomComponent} from '../add-or-edit-classroom/add-or-edit-classroom.component';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classrooms-list.component.html',
  styleUrls: ['./classrooms-list.component.scss']
})
export class ClassroomsListComponent implements OnInit {

  datasource: MatTableDataSource<Classroom>;
  mapping = {
    name: 'Nom',
    code: 'Code',
    capacity: 'Capacité',
    teacher: 'Professeur en Charge',
    'registrationFee.amount': 'Frais d\'inscription',
    'scholarship.amount': 'Frais de scolarité',
    commonOptions: 'Options'
  };

  constructor(private classroomRepository: ClassroomsRepository,
              private utils: Utils) {
  }

  add() {
    this.utils.common.modal(AddOrEditClassroomComponent, null);
  }

  edit(classroom: Classroom) {
    this.utils.common.modal(AddOrEditClassroomComponent, classroom);
  }

  delete(classroom: Classroom) {
    console.log(classroom);
  }

  ngOnInit() {
    this.classroomRepository.stream
      .subscribe((classrooms: Classroom[]) => {
        if (classrooms.length <= 0) { return; }
        this.datasource = new MatTableDataSource(classrooms);
      });
  }

}
