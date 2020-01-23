import {Component, OnInit} from '@angular/core';
import {StudentsRepository} from '../../../core/repositories/students.repository';
import {ClassroomsRepository} from '../../../core/repositories/classrooms.repository';
import {FormControl} from '@angular/forms';
import {Classroom} from '../../../core/models/classroom';
import {Student} from '../../../core/models/student';
import {Utils} from '../../../core/shared/utils';
import {EditStudentComponent} from '../edit-student/edit-student.component';
import {constants} from '../../../core/constants';
import {RegistrationsRepository} from '../../../core/repositories/registrations.repository';
import {Registration} from '../../../core/models/registration';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  constructor(public studentsRepository: StudentsRepository,
              public classroomsRepository: ClassroomsRepository,
              private registrationsRepository: RegistrationsRepository,
              private utils: Utils) {
  }

  registrations: Registration[];
  selected = -1;
  classroomSelected = new FormControl('');
  mapping = {
    matricule: 'Matricule',
    'append lastname firstname': 'Nom complet',
    gender: 'Sexe',
    options: 'Options'
  };
  optionsPermissions = { edit: constants.permissions.editStudent, delete: constants.permissions.deleteStudent };
  students: Student[];
  data = [];

  selectClassroom(classroom: Classroom, index: number) {
    this.selected = index;
    this.classroomSelected.patchValue(classroom);

    this.students = this.utils.student.classroomStudents(this.classroomSelected.value);
  }

  async edit(student: Student) {
    await this.utils.common.modal(EditStudentComponent, { student }, true);
    this.registrationsRepository.remoteRefresh();
  }

  async delete(student: Student) {
    const result = await this.utils.common.customAlert('Vous êtes sur le point de supprimer un élève', null, ['Annuler', 'Je continue']);
    if (result === 1) {
      const studentRegistration = this.utils.student.studentsRegistration(student);
      await this.registrationsRepository.remove(studentRegistration._id);
      this.students = this.utils.student.classroomStudents(this.classroomSelected.value);
      this.utils.common.toast(`L'élève ${student.lastname} a bien été supprimé`);
    }
  }

  ngOnInit() {
    this.registrationsRepository.stream
      .subscribe((registrations: Registration[]) => {
        this.registrations = [...registrations];
        this.students = this.utils.student.classroomStudents(this.classroomSelected.value);
      });
  }
}
