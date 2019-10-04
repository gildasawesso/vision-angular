import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Utils} from '../../../shared/utils';
import {SubjectsRepository} from '../../../repositories/subjects.repository';
import {Subject} from '../../../models/subject';
import {TeachersRepository} from '../../../repositories/teachers.repository';

@Component({
  selector: 'app-add-or-edit-subject',
  templateUrl: './add-or-edit-subject.component.html',
  styleUrls: ['./add-or-edit-subject.component.scss']
})
export class AddOrEditSubjectComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<AddOrEditSubjectComponent>,
              private utils: Utils,
              private subjectsRepository: SubjectsRepository,
              public teachersRepository: TeachersRepository) {
    this.subject = this.data.subject;
    if (this.subject) {
      this.subjectForm.patchValue(this.subject);
      this.submitText = 'Modifier le cours';
      this.title = 'Modification du cours de' + this.subject.name;
      console.log(this.subjectForm.value);
    }
  }

  subjectForm = this.formBuilder.group({
    _id: null,
    name: [''],
    code: [''],
    teachers: []
  });
  title = `Ajout d'un nouveau cours`;
  submitText = `Ajout le cours`;
  subject: Subject;

  save() {
    if (this.subjectForm.valid) {
      this.subject ? this.update() : this.create();
      this.utils.common.toast(`Opération réalisée avec succès`);
      this.dialogRef.close();
    } else {
      this.utils.common.alert('Il existe des erreurs dans le formulaire');
    }
  }

  async create() {
    await this.subjectsRepository.add(this.subjectForm.value);
  }

  async update() {
    await this.subjectsRepository.update(this.subjectForm.value, this.subject._id);
  }

  ngOnInit() {
  }

}
