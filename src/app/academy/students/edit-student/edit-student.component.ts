import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Student} from '../../../core/models/student';
import {FormBuilder, FormControl} from '@angular/forms';
import {Utils} from '../../../core/shared/utils';
import {Classroom} from '../../../core/models/classroom';
import {Repositories} from '../../../core/repositories/repositories';
import {Observable} from 'rxjs';
import {Registration} from '../../../core/models/registration';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  classrooms: Observable<Classroom[]>;
  student: Student;
  registration: Registration;
  studentId: string;
  studentClassroom = new FormControl();

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<EditStudentComponent>,
              private formBuilder: FormBuilder,
              private repo: Repositories,
              public utils: Utils) {
    this.studentId = this.data.studentId;
  }

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
    lastSchool: ['']
  });

  async save() {
    this.isBusy = true;
    if (!this.studentForm.valid) {
      this.utils.form.invalidatedForm(this.studentForm);
      return;
    }

    const student: Student = this.studentForm.value;
    try {
      await this.repo.students.update(student, this.student._id);
      if (this.studentClassroom.value._id !== this.registration.classroom._id) {
        this.registration.classroom = this.studentClassroom.value;
        await this.repo.registrations.update(this.registration, this.registration._id);
      }

      this.utils.common.toast(`L'élève ${student.lastname} a bien été modifié`);
      this.dialogRef.close();
    } catch (e) {
      console.error(e);
      this.utils.common.alert(JSON.stringify(e));
      this.isBusy = false;
    }
  }

  async getStudent() {
    this.registration = await this.repo.registrations.student(this.studentId);
    this.student = this.registration.student;
    this.studentForm.patchValue(this.student);
    this.studentClassroom.patchValue(this.registration.classroom);
  }

  ngOnInit() {
    this.classrooms = this.repo.classrooms.stream;
    this.getStudent();
  }
}
