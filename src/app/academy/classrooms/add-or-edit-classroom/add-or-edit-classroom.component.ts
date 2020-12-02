import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SubjectsRepository} from '../../../core/repositories/subjects.repository';
import {FeeTypesRepository} from '../../../core/repositories/fee-types.repository';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Utils} from '../../../core/shared/utils';
import {ClassroomsRepository} from '../../../core/repositories/classrooms.repository';
import {Classroom} from '../../../core/models/classroom';
import {TeachersRepository} from '../../../core/repositories/teachers.repository';
import {Repositories} from '../../../core/repositories/repositories';
import {Observable} from 'rxjs';
import {Teacher} from '../../../core/models/teacher';
import {Subject} from '../../../core/models/subject';
import {FeeType} from '../../../core/models/fee-type';

@Component({
  selector: 'app-add-or-edit-classroom',
  templateUrl: './add-or-edit-classroom.component.html',
  styleUrls: ['./add-or-edit-classroom.component.scss']
})
export class AddOrEditClassroomComponent implements OnInit {

  classroomForm = this.formBuilder.group({
    name: [''],
    code: [''],
    capacity: [''],
    teacher: [null],
    _teacher: [null],
    registrationFee: [null],
    _registrationFee: [null],
    reregistrationFee: [null],
    _reRegistrationFee: [null],
    schoolFee: [null],
    _schoolFee: [null],
    subjects: [null],
    _subjects: [null]
  });
  classroom: Classroom;
  classroomId: string;
  teachers: Observable<Teacher[]>;
  subjects: Observable<Subject[]>;
  fees: Observable<FeeType[]>;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<AddOrEditClassroomComponent>,
              private formBuilder: FormBuilder,
              public subjectsRepository: SubjectsRepository,
              public feesRepository: FeeTypesRepository,
              private classroomsRepository: ClassroomsRepository,
              private utils: Utils,
              private repo: Repositories,
              public teachersRepository: TeachersRepository) {
    this.classroomId = this.data.classroomId;
  }

  save() {
    if (this.classroomForm.valid) {
      this.classroomId ? this.updateClassroom() : this.createClassroom();
      this.utils.common.toast(`Opération réalisée avec succès`);
      this.dialogRef.close();
    } else {
      this.utils.common.alert('Il existe des erreurs dans le formulaire');
    }
  }

  async createClassroom() {
    await this.classroomsRepository.add(this.classroomForm.value);
  }

  async updateClassroom() {
    await this.classroomsRepository.update(this.classroomForm.value, this.classroom._id);
  }

  async init() {
    this.classroom = await this.repo.classrooms.one(this.classroomId);
    this.classroomForm.patchValue(this.classroom, { emitEvent: true });
    console.log(this.classroomForm.value);
  }

  ngOnInit() {
    this.teachers = this.repo.teachers.stream;
    this.subjects = this.repo.subjects.stream;
    this.fees = this.repo.fees.stream;

    if (this.classroomId) {
      this.init();
    }
  }
}
