import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Student} from '../../../models/student';
import {FormBuilder} from '@angular/forms';
import {Classroom} from '../../../models/classroom';
import {ClassroomsRepository} from '../../../repositories/classrooms.repository';
import {StudentsRepository} from '../../../repositories/students.repository';
import {Utils} from '../../../shared/utils';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<EditStudentComponent>,
              private formBuilder: FormBuilder,
              private classroomsRepository: ClassroomsRepository,
              private studentsRepository: StudentsRepository,
              private utils: Utils) {
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
    await this.studentsRepository.update(student, this.student._id);
    this.utils.common.toast(`L'élève ${student.lastname} a bien été modifié`);
    this.isBusy = false;
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
