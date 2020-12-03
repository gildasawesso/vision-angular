import {Component, OnInit} from '@angular/core';
import {ExaminationsRepository} from '../../../core/repositories/examinations.repository';
import { MatDialogRef } from '@angular/material/dialog';
import {Utils} from '../../../core/shared/utils';
import {ClassroomsRepository} from '../../../core/repositories/classrooms.repository';
import {FormControl, Validators} from '@angular/forms';
import {Classroom} from '../../../core/models/classroom';
import {ExaminationTypesRepository} from '../../../core/repositories/examinationTypes.repository';
import {Examination} from '../../../core/models/examination';
import * as moment from 'moment';
import {SchoolyearsRepository} from '../../../core/repositories/schoolyears.repository';
import {Subject} from '../../../core/models/subject';
import {ExaminationType} from '../../../core/models/examination-type';
import {Services} from '../../../core/services/services';
import {Repositories} from '../../../core/repositories/repositories';

@Component({
  selector: 'app-add-or-edit-examination',
  templateUrl: './add-or-edit-examination.component.html',
  styleUrls: ['./add-or-edit-examination.component.scss']
})
export class AddOrEditExaminationComponent implements OnInit {

  classroomFormControl = new FormControl('', Validators.required);
  subjectsFormControl = new FormControl('', Validators.required);
  examinationTypeFormControl = new FormControl('', Validators.required);
  examinationDateFormControl = new FormControl(moment().format());

  classroomSubjects;

  constructor(private examinationsRepository: ExaminationsRepository,
              public classroomsRepository: ClassroomsRepository,
              public examinationTypesRepository: ExaminationTypesRepository,
              public dialogRef: MatDialogRef<AddOrEditExaminationComponent>,
              private schoolyearsRepository: SchoolyearsRepository,
              private services: Services,
              private repo: Repositories,
              private utils: Utils) {
  }

  handleOnClassroomSelected() {
    this.classroomFormControl.valueChanges
      .subscribe(async (classroom: Classroom) => {
        const fullClassroom = await this.repo.classrooms.one(classroom._id);
        this.classroomSubjects = fullClassroom.subjects;
      });
  }

  async add() {
    if (this.isFormValid()) {
      try {
        const examinationTypes: ExaminationType[] = this.examinationTypeFormControl.value;
        const subjects: Subject[] = this.subjectsFormControl.value;
        examinationTypes.map(type => {
          subjects.map(async subject => {
            const examination: Examination = {
              classroomId: this.classroomFormControl.value._id,
              subjectId: subject._id,
              typeId: type._id,
              examinationDate: this.examinationDateFormControl.value,
              schoolYearId: this.services.schoolYear.snapshot._id,
              schoolId: this.services.auth.snapshot.schools[0]
            };
            await this.examinationsRepository.add(examination);
          });
        });
        this.utils.common.alert('Les axaminations ont été ajoutées avec succès', '');
        this.dialogRef.close();
      } catch (e) {
          console.error(e.error);
          this.utils.common.alert(e.error.message);
        }
    } else {
      this.utils.common.toast('Formulaire non valide');
    }
  }

  isFormValid() {
    return this.classroomFormControl.valid && this.subjectsFormControl.valid && this.examinationTypeFormControl.valid;
  }

  ngOnInit() {
    this.handleOnClassroomSelected();
  }

}
