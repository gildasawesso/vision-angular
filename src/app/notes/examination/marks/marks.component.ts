import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Examination} from '../../../core/models/examination';
import {ExaminationsRepository} from '../../../core/repositories/examinations.repository';
import {Mark} from '../../../core/models/mark';
import {Utils} from '../../../core/shared/utils';
import {Repositories} from '../../../core/repositories/repositories';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})
export class MarksComponent implements OnInit {

  examination: Examination;
  examinationId: string;
  searchTerm = '';

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private examinationsRepository: ExaminationsRepository,
              public dialogRef: MatDialogRef<MarksComponent>,
              private repo: Repositories,
              private utils: Utils) {
    this.examinationId = this.data.examinationId;
  }

  search(term) {
  }

  async onModelChange(note: number) {
    if (note > this.examination.subject.markBy) {
      this.utils.common.toast('La note est supérieure à la note maximale');
      return;
    }
    const x = await this.repo.exams.update(this.examination, this.examination._id);
  }

  sortMarks(m1: Mark, m2: Mark) {
    return m1.student.lastname.localeCompare(m2.student.lastname);
  }

  async save() {
    if (this.isMarksCorrect() === true) {
      await this.examinationsRepository.update(this.examination, this.examination._id);
      this.dialogRef.close();
    }
  }

  isMarksCorrect() {
    const markBy = this.examination.subject.markBy || 20;
    for (const m of this.examination.marks) {
      if (m.mark > markBy) {
        this.utils.common.toast(`La note de ${m.student.firstname} ${m.student.lastname} est supérieure à la note maximale`);
        return false;
      }
    }

    return true;
  }

  ngOnInit() {
    this.repo.exams.one(this.examinationId)
      .then(examination => {
        this.examination = examination;
        this.examination.marks.sort(this.sortMarks);
      })
      .catch(error => this.utils.common.toast(JSON.stringify(error)));
  }
}
