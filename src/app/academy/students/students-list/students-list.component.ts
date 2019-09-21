import {Component, OnInit} from '@angular/core';
import {StudentsRepository} from '../../../core/repositories/students.repository';
import {ClassroomsRepository} from '../../../core/repositories/classrooms.repository';
import {FormControl} from '@angular/forms';
import {filter, flatMap, switchMap} from 'rxjs/operators';
import {Classroom} from '../../../models/classroom';
import {Student} from '../../../models/student';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  classroomSelected = new FormControl('');

  mapping = {
    matricule: 'Matricule',
    'lastname firstname': 'Nom complet',
    gender: 'Sexe',
    options: 'Options'
  };
  students: Student[];
  data = [];

  constructor(public studentsRepository: StudentsRepository,
              public classroomsRepository: ClassroomsRepository) {
  }

  ngOnInit() {
    this.classroomSelected.valueChanges
      .subscribe((classroom: Classroom) => {
        this.data = this.students.filter(student => student.classroom && student.classroom._id === classroom._id);
      });

    this.studentsRepository.stream.subscribe(students => this.students = students);
  }

}
