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
import {generate} from 'rxjs';

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
    console.log(this.classroomSelected);
    return this.classroomStudents.map(student => {
      return {
        student,
        examinationsTypes: this.classroomExaminationTypes.map(t => t.name),
        classroom: this.classroomSelected,
        schoolYear: this.schoolYear,
        term: this.schoolYear.sessions[0].name,
        subjects: this.classroomSelected.subjects.map(subject => {
          this.notesBySubject[subject._id] = {
            subject,
          };
          const marksByExaminationType = this.marksByExaminationType(student, subject);
          const totalMarks = marksByExaminationType.reduce((acc, cur) => acc + cur.marks, 0);
          const meanByTwenty = marksByExaminationType.reduce((acc, cur) => acc + cur.marks, 0) / marksByExaminationType.length;
          const studentMarksForCurrentSubject = this.studentsMarksGroupedBySubject.find(m => m.subject._id === subject._id).examinations;
          const studentMarksForCurrentSubjectSorted = studentMarksForCurrentSubject.sort((m1, m2) => m2.meanByTwenty - m1.meanByTwenty);
          const rank = studentMarksForCurrentSubjectSorted.findIndex(m => m.student._id === student._id) + 1;
          const firstRankMean = studentMarksForCurrentSubjectSorted[0].meanByTwenty;
          const lastRankMean = studentMarksForCurrentSubjectSorted[studentMarksForCurrentSubjectSorted.length - 1].meanByTwenty;
          return {
            subject,
            totalMarks,
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
        marks: currentSubjectAndTypeExaminations.length >= 1 ? marksSum / currentSubjectAndTypeExaminations.length : 0
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
  }

  async printBulletin(student: Student) {
    if (this.canGenerateClassroomBulletin()) {
      const loading = this.utils.common.loading(`Le Bulletin de ${student.firstname} ${student.lastname} est en cours de génération`);
      const marks = this.classroomStudentsExamainations;
      const studentAndGeneralMean = marks.map(m => {
        const totalCoef = m.subjects.reduce((acc, cur) => acc + cur.coef, 0);
        const totalPoints = m.subjects.reduce((acc, cur) => acc + Number(cur.meanByCoefficient), 0);
        const genralMean = totalPoints / totalCoef;
        return {
          student: m.student,
          mean: genralMean
        };
      });
      const studentAndMeanSorted = studentAndGeneralMean.sort((s1, s2) => s2.mean - s1.mean);
      const currentStudentRank = studentAndMeanSorted.findIndex(m => m.student._id === student._id);
      const currentStudentMarks: any = marks.find(m => m.student._id === student._id);
      currentStudentMarks.mainRank = currentStudentRank + 1;
      currentStudentMarks.bestClassroomMean = studentAndMeanSorted[0].mean.toFixed(2);
      currentStudentMarks.lastClassroomMean = studentAndMeanSorted[studentAndMeanSorted.length - 1].mean.toFixed(2);
      try {
        await this.utils.print.bulletin(currentStudentMarks);
        loading.close();
      } catch (e) {
        console.error(e);
        loading.close();
        this.utils.common.alert(JSON.stringify(e.error));
      }
    }
  }

  setupBulletin(student: Student) {
    const marks = this.classroomStudentsExamainations;
    const studentAndGeneralMean = marks.map(m => {
      const totalCoef = m.subjects.reduce((acc, cur) => acc + cur.coef, 0);
      const totalPoints = m.subjects.reduce((acc, cur) => acc + Number(cur.meanByCoefficient), 0);
      const genralMean = totalPoints / totalCoef;
      return {
        student: m.student,
        mean: genralMean
      };
    });
    const studentAndMeanSorted = studentAndGeneralMean.sort((s1, s2) => s2.mean - s1.mean);
    const currentStudentRank = studentAndMeanSorted.findIndex(m => m.student._id === student._id);
    const currentStudentMarks: any = marks.find(m => m.student._id === student._id);
    currentStudentMarks.mainRank = currentStudentRank + 1;
    currentStudentMarks.bestClassroomMean = studentAndMeanSorted[0].mean.toFixed(2);
    currentStudentMarks.lastClassroomMean = studentAndMeanSorted[studentAndMeanSorted.length - 1].mean.toFixed(2);

    return currentStudentMarks;
  }

  async printClassroomBulletins(classroom: Classroom, index: number) {
    this.classroomSelected = classroom;
    this.selected = index;

    if (this.canGenerateClassroomBulletin()) {
      const bulletins = this.classroomStudents.map(student => this.setupBulletin(student));
      const loading = this.utils.common.loading('Les Bulletins sont en cours de génération');
      try {
        await this.utils.print.classroomBulletin(bulletins);
        loading.close();
      } catch (e) {
        this.utils.common.alert(JSON.stringify(e.error));
        loading.close();
      }
    }
  }

  canGenerateClassroomBulletin() {
    if (this.classroomSelected.subjects == null || this.classroomSelected.subjects.length <= 0) {
      this.utils.common.toast('Cette classe ne dispose pas de cours');
      return false;
    }

    if (this.classroomStudents.length <= 0) {
      this.utils.common.toast('Aucun élève n\'est présent dans cette classe');
      return false;
    }

    return true;
  }

  canGenerateStudentBulletin(student: Student) {
    if (this.classroomSelected.subjects == null || this.classroomSelected.subjects.length <= 0) {
      this.utils.common.toast('la classe de cet élève ne dispose pas de cours');
      return false;
    }

    return true;
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
