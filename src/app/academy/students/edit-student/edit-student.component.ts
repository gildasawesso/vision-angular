import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Student} from '../../../core/models/student';
import {FormBuilder} from '@angular/forms';
import {ClassroomsRepository} from '../../../core/repositories/classrooms.repository';
import {StudentsRepository} from '../../../core/repositories/students.repository';
import {Utils} from '../../../core/shared/utils';
import {RegistrationsRepository} from '../../../core/repositories/registrations.repository';
import {Classroom} from '../../../core/models/classroom';
import {Repositories} from '../../../core/repositories/repositories';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  studentsClassroom: Classroom;
  students: Observable<Student[]>;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<EditStudentComponent>,
              private formBuilder: FormBuilder,
              private repo: Repositories,
              public utils: Utils) {
    this.student = this.data.student;
    this.studentForm.patchValue(this.student);
  }

  student: Student;
  isBusy = false;
  studentForm = this.formBuilder.group({
    _id: [''],
    firstname: [''],
    lastname: [''],
    birthday: [''],
    matricule: [''],
    gender: [''],
    status: [''],
    birthCity: [''],
    fathersFirstname: [''],
    fathersLastname: [''],
    mothersFirstname: [''],
    mothersLastname: [''],
    fathersJob: [''],
    mothersJob: [''],
    fathersPhone: [''],
    mothersPhone: [''],
    address: [''],
    lastClass: [''],
    lastSchool: [''],
    classroom: ['']
  });

  async save() {
    this.isBusy = true;
    if (!this.studentForm.valid) {
      this.utils.form.invalidatedForm(this.studentForm);
      return;
    }

    const student: Student = this.studentForm.value;
    try {
      const studentUpdated = await this.repo.students.update(student, this.student._id);
      const studentRegistration = this.utils.student.studentRegistration(studentUpdated);
      await this.repo.registrations.update(studentRegistration, studentRegistration._id);
      this.utils.common.toast(`L'élève ${student.lastname} a bien été modifié`);
      this.repo.registrations.remoteRefresh();
      this.isBusy = false;
      this.dialogRef.close();
    } catch (e) {
      console.error(e);
      this.utils.common.alert(JSON.stringify(e));
      this.isBusy = false;
    }
  }

  ngOnInit() {
    this.studentsClassroom = this.utils.student.studentRegistration(this.student).classroom;
    this.students = this.repo.students.stream;
  }

}
