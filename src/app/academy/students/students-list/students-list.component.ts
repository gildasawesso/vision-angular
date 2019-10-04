import {Component, OnInit} from '@angular/core';
import {StudentsRepository} from '../../../repositories/students.repository';
import {ClassroomsRepository} from '../../../repositories/classrooms.repository';
import {FormControl} from '@angular/forms';
import {filter, flatMap, switchMap} from 'rxjs/operators';
import {Classroom} from '../../../models/classroom';
import {Student} from '../../../models/student';
import {Utils} from '../../../shared/utils';
import {EditStudentComponent} from '../edit-student/edit-student.component';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  constructor(public studentsRepository: StudentsRepository,
              public classroomsRepository: ClassroomsRepository,
              private utils: Utils) {
  }

  classroomSelected = new FormControl('');
  mapping = {
    matricule: 'Matricule',
    'append lastname firstname': 'Nom complet',
    gender: 'Sexe',
    options: 'Options'
  };
  students: Student[];
  data = [];



  async edit(student: Student) {
    await this.utils.common.modal(EditStudentComponent, { student }, true);
  }

  async delete(student: Student) {
    const result = await this.utils.common.customAlert('Vous êtes sur le point de supprimer un élève', null, ['Annuler', 'Je continue']);
    if (result === 1) {
      await this.studentsRepository.remove(student._id);
      this.utils.common.toast(`Lélève ${student.lastname} a bien été supprimé`);
    }
  }

  ngOnInit() {
    this.classroomSelected.valueChanges
      .subscribe((classroom: Classroom) => {
        this.students = this.filterByClassroom(this.studentsRepository.list, classroom);
      });

    this.studentsRepository.stream.subscribe(students => {
      this.students = this.filterByClassroom(students);
    });
  }

  filterByClassroom(students, classroomSelected?: Classroom) {
    if (this.classroomSelected.value === '') {
      return [];
    } else {
      const classroom = classroomSelected != null ? classroomSelected : this.classroomSelected.value;
      return students.filter(student => student.classroom && student.classroom._id === classroom._id);
    }
  }

}
