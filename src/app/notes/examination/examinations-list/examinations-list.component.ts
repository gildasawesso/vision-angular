import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ExaminationType} from '../../../core/models/examination-type';
import {AddOrEditExaminationComponent} from '../add-or-edit-examination/add-or-edit-examination.component';
import {Examination} from '../../../core/models/examination';
import {MarksComponent} from '../marks/marks.component';
import {ExaminationsRepository} from '../../../core/repositories/examinations.repository';
import {ExaminationTypesRepository} from '../../../core/repositories/examinationTypes.repository';
import {Utils} from '../../../core/shared/utils';
import {constants} from '../../../core/constants';
import {ClassroomsRepository} from '../../../core/repositories/classrooms.repository';
import {Classroom} from '../../../core/models/classroom';
import {Subject} from '../../../core/models/subject';
import {FormControl} from '@angular/forms';
import {SchoolyearsRepository} from '../../../core/repositories/schoolyears.repository';
import {SchoolSession} from '../../../core/models/school-session';
import * as moment from 'moment';
import { SortType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-examinations-list',
  templateUrl: './examinations-list.component.html',
  styleUrls: ['./examinations-list.component.scss']
})
export class ExaminationsListComponent implements OnInit {

  constants = constants;
  sortType = SortType;
  examinationTypes: ExaminationType[] = [];
  examinations: Examination[] = [];
  classrooms: Classroom[] = [];
  subjects: Subject[] = [];
  rows = [];
  columns = [];
  mapping = {
    'date createdAt': 'Date de l\'examen',
    'subject.code': 'Matière',
    'type.name': 'Type d\'examination',
    notes: 'Notes',
    options: 'Options',
  };

  classroomSelected = new FormControl(null);
  subjectSelected = new FormControl(null);
  examinationTypeSelected = new FormControl(null);

  @ViewChild('subjectTemplate', {static: true}) subjectTemplate: TemplateRef<any>;
  @ViewChild('examinationTypeTemplate', {static: true}) examinationTypeTemplate: TemplateRef<any>;
  @ViewChild('noteTemplate', {static: true}) noteTemplate: TemplateRef<any>;
  @ViewChild('actionsTemplate', {static: true}) actionsTemplate: TemplateRef<any>;

  constructor(private examinationsRepository: ExaminationsRepository,
              private examinationTypesRepository: ExaminationTypesRepository,
              private classroomsRepository: ClassroomsRepository,
              private schoolyearsRepository: SchoolyearsRepository,
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
    console.log(examination);
    this.utils.common.modal(MarksComponent, { examination }, true);
  }

  isClassroomHasSubjects(classroom: Classroom) {
    return classroom != null && classroom.subjects != null && classroom.subjects.length > 0;
  }

  loadExaminations() {
    let examinations = [...this.examinations];

    if (this.classroomSelected.value != null) {
      examinations = examinations.filter(e => this.classroomSelected.value._id === e.classroom._id);
    }

    if (this.subjectSelected.value != null) {
      examinations = examinations.filter(e => this.subjectSelected.value._id === e.subject._id);
    }

    if (this.examinationTypeSelected.value != null) {
      examinations = examinations.filter(e => this.examinationTypeSelected.value._id === e.type._id);
    }

    this.rows = examinations;
  }

  ngOnInit() {
    this.schoolyearsRepository.selectedSchoolYearTerm
      .subscribe((session: SchoolSession) => {
        if (session == null) { return; }
        this.examinationsRepository.stream
          .subscribe(async (examinations: Examination[]) => {
            console.log(examinations);
            this.examinations = examinations.filter(e => {
              return moment(e.examinationDate).isBetween(moment(session.startDate), moment(session.endDate), null, '[]');
            });
            this.loadExaminations();
          });
      });

    this.examinationTypesRepository.stream.subscribe(examinationTypes => this.examinationTypes = examinationTypes);
    this.classroomsRepository.stream.subscribe(classrooms => this.classrooms = classrooms);
    this.classroomSelected.valueChanges.subscribe((classroom: Classroom) => {
      if (classroom != null) { this.subjects = classroom.subjects; }
      this.loadExaminations();
    });
    this.subjectSelected.valueChanges.subscribe(_ => this.loadExaminations());
    this.examinationTypeSelected.valueChanges.subscribe(_ => this.loadExaminations());

    this.columns = [
      { prop: 'examinationDate', name: 'Date d\'examen', pipe: { transform: this.utils.common.formatDate} },
      { name: 'Matière', cellTemplate: this.subjectTemplate },
      { name: 'Type d\'examen', cellTemplate: this.examinationTypeTemplate },
      { name: 'Note', cellTemplate: this.noteTemplate },
      { name: 'Options', cellTemplate: this.actionsTemplate }
    ];
  }
}
