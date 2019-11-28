import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Student} from '../../../core/models/student';
import {FormBuilder} from '@angular/forms';
import {ClassroomsRepository} from '../../../core/repositories/classrooms.repository';
import {StudentsRepository} from '../../../core/repositories/students.repository';
import {Utils} from '../../../core/shared/utils';
import {RegistrationsRepository} from '../../../core/repositories/registrations.repository';
import {Classroom} from '../../../core/models/classroom';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  studentClassroom: Classroom;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<EditStudentComponent>,
              private formBuilder: FormBuilder,
              private classroomsRepository: ClassroomsRepository,
              private studentsRepository: StudentsRepository,
              private registrationsRepository: RegistrationsRepository,
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
      await this.studentsRepository.update(student, this.student._id);
      this.utils.common.toast(`L'élève ${student.lastname} a bien été modifié`);
      this.registrationsRepository.refresh();
      this.isBusy = false;
      this.dialogRef.close();
    } catch (e) {
      console.error(e);
      this.utils.common.alert(JSON.stringify(e));
      this.isBusy = false;
    }
  }

  ngOnInit() {
    this.registrationsRepository.stream
      .subscribe(registrations => {
        this.studentClassroom = this.utils.student.studentRegistration(registrations, this.student).classroom;
      });
  }

}
