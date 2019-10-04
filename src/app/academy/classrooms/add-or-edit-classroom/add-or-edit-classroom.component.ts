import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SubjectsRepository} from '../../../repositories/subjects.repository';
import {FeeTypesRepository} from '../../../repositories/fee-types.repository';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Utils} from '../../../shared/utils';
import {ClassroomsRepository} from '../../../repositories/classrooms.repository';
import {Classroom} from '../../../models/classroom';
import {TeachersRepository} from '../../../repositories/teachers.repository';

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
    registrationFee: [null],
    schoolFee: [null],
    subjects: [null]
  });
  title = `Ajout d'une nouvelle classe`;
  submitText = `Créer la classe`;
  classroom: Classroom;
  isNewClassroom = true;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<AddOrEditClassroomComponent>,
              private formBuilder: FormBuilder,
              public subjectsRepository: SubjectsRepository,
              public feesRepository: FeeTypesRepository,
              private classroomsRepository: ClassroomsRepository,
              private utils: Utils,
              public teachersRepository: TeachersRepository) {
    if (this.data) {
      this.isNewClassroom = false;
      this.classroom = this.data;
      this.title = `Modification de la classe de ${this.classroom.name}`;
      this.submitText = `Modifier la classe`;
      this.classroomForm.patchValue(this.classroom);
    }
  }

  save() {
    if (this.classroomForm.valid) {
      this.isNewClassroom ? this.createClassroom() : this.updateClassroom();
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

  ngOnInit() {
  }

}
