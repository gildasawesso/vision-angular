import {Component, OnInit} from '@angular/core';
import {ClassroomsRepository} from '../../core/repositories/classrooms.repository';
import {RegistrationsRepository} from '../../core/repositories/registrations.repository';
import {Classroom} from '../../core/models/classroom';
import {Registration} from '../../core/models/registration';
import {ExaminationsRepository} from '../../core/repositories/examinations.repository';
import {Examination} from '../../core/models/examination';
import {Utils} from '../../core/shared/utils';
import {SchoolyearsRepository} from '../../core/repositories/schoolyears.repository';
import {SchoolYear} from '../../core/models/school-year';
import {SubjectsRepository} from '../../core/repositories/subjects.repository';
import {Subject} from '../../core/models/subject';
import {Student} from '../../core/models/student';
import {ExaminationType} from '../../core/models/examination-type';

@Component({
  selector: 'app-bulletins',
  templateUrl: './bulletins.component.html',
  styleUrls: ['./bulletins.component.scss']
})
export class BulletinsComponent implements OnInit {

  classrooms: Classroom[] = [];
  registrations: Registration[] = [];
  subjects: Subject[] = [];
  schoolYear: SchoolYear;
  examinations: Examination[] = [];
  selected = -1;
  classroomSelected: Classroom;
  notesBySubject: any;

  get studentsMarksGroupedBySubject() {
    return this.subjectExaminationsByType.map(subjectByType => {

      const studentsMarks = this.classroomStudents.map(student => {
        const markPerExaminationType = this.marksByExaminationType(student, subjectByType.subject);
        const meanByTwenty = markPerExaminationType.reduce((acc, cur) => acc + cur.marks, 0) / markPerExaminationType.length;
        return {
          student,
          meanByTwenty
        };
      });

      return {
        subject: subjectByType.subject,
        examinations: studentsMarks
      };
    });
  }

  get classroomStudentsExamainations() {
    this.notesBySubject = {};
    return this.classroomStudents.map(student => {
      return {
        student,
        classroom: this.classroomSelected,
        schoolYear: this.schoolYear,
        term: this.schoolYear.sessions[0].name,
        subjects: this.classroomSelected.subjects.map(subject => {
          this.notesBySubject[subject._id] = {
            subject,
          };
          const marksByExaminationType = this.marksByExaminationType(student, subject);
          const meanByTwenty = marksByExaminationType.reduce((acc, cur) => acc + cur.marks, 0) / marksByExaminationType.length;
          const studentMarksForCurrentSubject = this.studentsMarksGroupedBySubject.find(m => m.subject._id === subject._id).examinations;
          const studentMarksForCurrentSubjectSorted = studentMarksForCurrentSubject.sort((m1, m2) => m2.meanByTwenty - m1.meanByTwenty);
          const rank = studentMarksForCurrentSubjectSorted.findIndex(m => m.student._id === student._id) + 1;
          const firstRankMean = studentMarksForCurrentSubjectSorted[0].meanByTwenty;
          const lastRankMean = studentMarksForCurrentSubjectSorted[studentMarksForCurrentSubjectSorted.length - 1].meanByTwenty;
          return {
            subject,
            meanByTwenty,
            coef: subject.coefficient,
            rank,
            firstRankMean,
            lastRankMean,
            meanByCoefficient: meanByTwenty * subject.coefficient,
            examinationsByType: marksByExaminationType
          };
        })
      };
    });
  }

  get classroomStudents() {
    return this.registrationsRepository.studentsForClassroom(this.registrations, this.classroomSelected);
  }

  rank(subject: Subject, examinationType: ExaminationType) {
    const examinations = this.classroomExaminations.filter(e => e.subject._id === subject._id && e.type._id === examinationType._id);

  }

  marksByExaminationType(student: Student, subject: Subject) {
    return this.classroomExaminationTypes.map(type => {
      const currentSubjectAndTypeExaminations = this.classroomExaminations.filter(e => e.subject._id === subject._id && e.type._id === type._id);
      const marksSum = currentSubjectAndTypeExaminations.reduce((acc, cur) => acc + cur.marks.find(m => m.student._id === student._id).mark, 0);
      return {
        examinationType: type,
        marks: marksSum / currentSubjectAndTypeExaminations.length
      };
    });
  }

  get classroomExaminations() {
    return this.utils.examination.classroomExaminations(this.classroomSelected);
  }

  get subjectExaminations() {
    return this.classroomSelected.subjects.map(s => {
      return {
        subject: s,
        examinations: this.classroomExaminations.filter(e => e.subject._id === s._id)
      };
    });
  }

  get subjectExaminationsByType() {
    return this.subjectExaminations.map(subjectAndExaminations => {
      return {
        subject: subjectAndExaminations.subject,
        examinationsByType: this.classroomExaminationTypes.map(type => {
          return {
            examinationType: type,
            examinations: subjectAndExaminations.examinations.filter(e => e.type._id === type._id)
          };
        })
      };
    });
  }

  get classroomExaminationTypes() {
    return this.utils.examination.classroomExaminationTypes(this.classroomSelected);
  }

  constructor(private classroomsRepository: ClassroomsRepository,
              private registrationsRepository: RegistrationsRepository,
              private examinationsRepository: ExaminationsRepository,
              private schoolyearsRepository: SchoolyearsRepository,
              private subjectsRepository: SubjectsRepository,
              private utils: Utils) {
  }

  selectClassroom(classroom: Classroom, index: number) {
    this.selected = index;
    this.classroomSelected = classroom;

    console.log(this.classroomStudentsExamainations);
  }

  async printBulletin(student: Student) {
    const marks = this.classroomStudentsExamainations;
    const currentStudentMarks = marks.find(m => m.student._id === student._id);
    await this.utils.print.bulletin(currentStudentMarks);
  }

  ngOnInit() {
    this.classroomsRepository.stream
      .subscribe(classrooms => this.classrooms = classrooms);

    this.registrationsRepository.stream
      .subscribe(registrations => this.registrations = registrations);

    this.examinationsRepository.stream
      .subscribe(examinations => this.examinations = examinations);

    this.schoolyearsRepository.stream
      .subscribe(schoolYears => this.schoolYear = schoolYears[0]);

    this.subjectsRepository.stream
      .subscribe(subjects => this.subjects = subjects);
  }

}
