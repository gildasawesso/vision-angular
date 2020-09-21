import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Utils} from '../../../core/shared/utils';
import {TeachersRepository} from '../../../core/repositories/teachers.repository';
import {Teacher} from '../../../core/models/teacher';

@Component({
  selector: 'app-add-or-edit-teacher',
  templateUrl: './add-or-edit-teacher.component.html',
  styleUrls: ['./add-or-edit-teacher.component.scss']
})
export class AddOrEditTeacherComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<AddOrEditTeacherComponent>,
              private utils: Utils,
              private teachersRepository: TeachersRepository) {
    this.teacher = this.data.teacher;
    if (this.teacher) {
      this.teacherForm.patchValue(this.teacher);
      this.title = 'Modification de l\'enseignant ' + this.teacher.lastname;
      this.submitText = 'Modifier l\'enseignant';
    }
  }

  teacherForm = this.formBuilder.group({
    firstname: [''],
    lastname: [''],
    gender: [''],
    address: [''],
    phone: [''],
    qualifications: [''],
    hireDate: [''],
    fireDate: ['']
  });
  title = `Ajout d'un nouvel enseignant`;
  submitText = `Ajouter l'enseignant`;
  teacher: Teacher;

  save() {
    if (this.teacherForm.valid) {
      this.teacher ? this.update() : this.create();
      this.utils.common.toast(`Opération réalisée avec succès`);
      this.dialogRef.close();
    } else {
      this.utils.common.alert('Il existe des erreurs dans le formulaire');
    }
  }

  async create() {
    await this.teachersRepository.add(this.teacherForm.value);
  }

  async update() {
    await this.teachersRepository.update(this.teacherForm.value, this.teacher._id);
  }

  ngOnInit() {
  }

}
