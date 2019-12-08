import { Component, OnInit } from '@angular/core';
import {ExaminationType} from '../../../core/models/examination-type';
import {AddOrEditExaminationComponent} from '../add-or-edit-examination/add-or-edit-examination.component';
import {Examination} from '../../../core/models/examination';
import {MarksComponent} from '../marks/marks.component';
import {AddOrEditExaminationTypeComponent} from '../add-or-edit-examination-type/add-or-edit-examination-type.component';
import {ExaminationsRepository} from '../../../core/repositories/examinations.repository';
import {ExaminationTypesRepository} from '../../../core/repositories/examinationTypes.repository';
import {Utils} from '../../../core/shared/utils';
import {constants} from '../../../core/constants';
import {ClassroomsRepository} from '../../../core/repositories/classrooms.repository';
import {Classroom} from '../../../core/models/classroom';
import {Subject} from '../../../core/models/subject';

@Component({
  selector: 'app-examinations-list',
  templateUrl: './examinations-list.component.html',
  styleUrls: ['./examinations-list.component.scss']
})
export class ExaminationsListComponent implements OnInit {

  constants = constants;
  examinationTypes: ExaminationType[] = [];
  examinations: Examination[] = [];
  classrooms: Classroom[] = [];
  data = [];
  mapping = {
    'date createdAt': 'Date de l\'examen',
    'subject.code': 'Matière',
    'type.name': 'Type d\'examination',
    notes: 'Notes',
    options: 'Options',
  };
  optionsPermissions = { edit: constants.permissions.editExamination, delete: constants.permissions.deleteExamination };

  classroomSelected: Classroom = null;
  subjectSelected: Subject = null;
  examinationTypeSelected: ExaminationType = null;

  set ClassroomSelected(classroom: Classroom) {
    if (!this.isClassroomHasSubjects(classroom)) {
      this.utils.common.toast('Cette classe ne contient aucune matière');
      return;
    }
    this.classroomSelected = classroom;
    this.loadExaminations();
  }

  set SubjectSelected(subject: Subject) {
    this.subjectSelected = subject;
    this.loadExaminations();
  }

  set ExaminationTypeSelected(examinationType: ExaminationType) {
    this.examinationTypeSelected = examinationType;
    this.loadExaminations();
  }

  constructor(private examinationsRepository: ExaminationsRepository,
              private examinationTypesRepository: ExaminationTypesRepository,
              private classroomsRepository: ClassroomsRepository,
              private utils: Utils) { }

  async add() {
    await this.utils.common.modal(AddOrEditExaminationComponent, { examination: null });
  }

  edit(examination: Examination) {

  }

  async delete(examination: Examination) {
    const res = await this.utils.common.customAlert('L\'examination sera supprimée définitivement', 'Attention', ['Annuler', 'Je comprends']);
    if (res) {
      await this.examinationsRepository.remove(examination._id);
    }
  }

  openNotesPage(examination: Examination) {
    this.utils.common.modal(MarksComponent, { examination }, true);
  }

  isClassroomHasSubjects(classroom: Classroom) {
    return classroom != null && classroom.subjects != null && classroom.subjects.length > 0;
  }

  loadExaminations() {
    let examinations = [...this.examinations];

    examinations = examinations.filter(e => {
      if (this.classroomSelected == null) { return true; }
      return this.classroomSelected._id === e.classroom._id;
    });

    examinations = examinations.filter(e => {
      if (this.subjectSelected == null) { return true; }

      return e.subject._id === this.subjectSelected._id;
    });

    examinations = examinations.filter(e => {
      if (this.examinationTypeSelected == null) { return true; }

      return e.type._id === this.examinationTypeSelected._id;
    });

    this.data = examinations;
  }

  ngOnInit() {
    this.examinationsRepository.stream
      .subscribe((examinations: Examination[]) => {
        this.examinations = examinations;
        this.loadExaminations();
      });

    this.examinationTypesRepository.stream
      .subscribe((examinationTypes: ExaminationType[]) => {
        this.examinationTypes = examinationTypes;
      });

    this.classroomsRepository.stream.subscribe(classrooms => this.classrooms = classrooms);
  }
}
