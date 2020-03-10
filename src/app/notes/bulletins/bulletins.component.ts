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
import {SchoolSession} from '../../core/models/school-session';
import * as moment from 'moment';
import {last} from 'rxjs/operators';

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

  studentsMarksGroupedBySubject(session: SchoolSession) {
    return this.subjectExaminationsByType.map(subjectByType => {

      const studentsMarks = this.classroomStudents.map(student => {
        const markPerExaminationType = this.marksByExaminationType(student, subjectByType.subject, session);
        const marksByExaminationTypeNotNull = markPerExaminationType.filter(m => m.marks != null);
        const meanByTwenty = marksByExaminationTypeNotNull.length <= 0 ? 0 : marksByExaminationTypeNotNull.reduce((acc, cur) => acc + cur.marks, 0) / marksByExaminationTypeNotNull.length;
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

  get classroomStudents() {
    return this.utils.student.classroomStudents(this.classroomSelected);
  }

  rank(subject: Subject, examinationType: ExaminationType) {
    const examinations = this.classroomExaminations.filter(e => e.subject._id === subject._id && e.type._id === examinationType._id);

  }

  marksByExaminationType(student: Student, subject: Subject, session: SchoolSession) {
    return this.classroomExaminationTypes.map(type => {
      const currentSubjectAndTypeExaminations = this.classroomExaminations.filter(e => e.subject._id === subject._id && e.type._id === type._id && this.isSessionExamination(e, session));

      let subjectsToRemove = 0;
      const marksSum = currentSubjectAndTypeExaminations.reduce((acc, cur) => {
        const markObject = cur.marks.find(m => m.student._id === student._id);
        if (markObject === undefined) {
          subjectsToRemove += 1;
          return acc;
        }

        const mark = markObject.mark;
        if (mark == null) { subjectsToRemove += 1; }
        return acc + mark;
      }, 0);

      if (subjectsToRemove === currentSubjectAndTypeExaminations.length) {
        return {
          examinationType: type,
          marks: null
        };
      }

      return {
        examinationType: type,
        marks: currentSubjectAndTypeExaminations.length >= 1 ? marksSum / (currentSubjectAndTypeExaminations.length - subjectsToRemove) : null
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
    const examinations = this.utils.examination.classroomExaminationTypes(this.classroomSelected);
    return examinations.sort((e1, e2) => e1.displayOrder - e2.displayOrder);
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

  studentOtherBulletinInformation(student, session) {
    const bulletinInformations = this.utils.student.studentRegistration(student).classroom.subjects.map(subject => {
      this.notesBySubject[subject._id] = {
        subject,
      };
      const marksByExaminationType = this.marksByExaminationType(student, subject, session);
      const marksByExaminationTypeNotNull = marksByExaminationType.filter(m => m.marks != null);
      const totalMarks = marksByExaminationTypeNotNull.length <= 0 ? 0 : marksByExaminationTypeNotNull.reduce((acc, cur) => acc + cur.marks, 0);
      const meanByTwenty = marksByExaminationTypeNotNull.length <= -1 ? 0 : marksByExaminationTypeNotNull.reduce((acc, cur) => acc + cur.marks, 0) / marksByExaminationTypeNotNull.length;
      const studentMarksForCurrentSubject = this.studentsMarksGroupedBySubject(session).find(m => m.subject._id === subject._id).examinations;
      const studentMarksForCurrentSubjectSorted = studentMarksForCurrentSubject.sort((m1, m2) => m2.meanByTwenty - m1.meanByTwenty);
      const rank = studentMarksForCurrentSubjectSorted.findIndex(m => m.student._id === student._id) + 1;
      const firstRankMean = studentMarksForCurrentSubjectSorted[0].meanByTwenty;
      const appreciation = this.utils.student.appreciationFromMark(meanByTwenty);
      const lastRankMean = studentMarksForCurrentSubjectSorted[studentMarksForCurrentSubjectSorted.length - 1].meanByTwenty;
      return {
        subject,
        totalMarks,
        meanByTwenty,
        coef: meanByTwenty >= 0 ? subject.coefficient : 0,
        rank,
        firstRankMean,
        lastRankMean,
        appreciation,
        meanByCoefficient: meanByTwenty >= 0 ? meanByTwenty * subject.coefficient : 0,
        examinationsByType: marksByExaminationType
      };
    });

    const totalCoef = bulletinInformations.reduce((acc, cur) => acc + cur.coef, 0);
    const totalPoints = bulletinInformations.reduce((acc, cur) => acc + Number(cur.meanByCoefficient), 0).toFixed(2);
    const generalMean = (Number(totalPoints) / Number(totalCoef)).toFixed(2);
    return {
      session,
      generalMean: generalMean === 'NaN' ? 0 : Number(generalMean),
    };
  }

  classroomAnnualMeans(classroom: Classroom) {
    const studentsAnnualMean = this.utils.student.classroomStudents(classroom).map(student => {
      const meanBySession = this.schoolYear.sessions.map(session => this.studentOtherBulletinInformation(student, session));
      const annualMean = meanBySession.reduce((acc, cur) => acc + cur.generalMean, 0) / meanBySession.length;
      return {
        student,
        annualMean
      };
    });
    return studentsAnnualMean.sort((meanOne, meanTwo) => meanTwo.annualMean - meanOne.annualMean);
  }

  classroomStudentsExamainations(session: SchoolSession) {
    this.notesBySubject = {};
    return this.classroomStudents.map(student => {
      return {
        student,
        classSize: this.utils.student.classroomStudents(this.classroomSelected).length,
        examinationsTypes: this.classroomExaminationTypes.map(t => t.name),
        classroom: this.classroomSelected,
        schoolYear: this.schoolYear,
        term: session.name,
        subjects: this.classroomSelected.subjects.map(subject => {
          this.notesBySubject[subject._id] = {
            subject,
          };
          const marksByExaminationType = this.marksByExaminationType(student, subject, session);
          const marksByExaminationTypeNotNull = marksByExaminationType.filter(m => m.marks != null);
          const totalMarks = marksByExaminationTypeNotNull.length <= 0 ? 0 : marksByExaminationTypeNotNull.reduce((acc, cur) => acc + cur.marks, 0);
          const meanByTwenty = marksByExaminationTypeNotNull.length <= -1 ? 0 : marksByExaminationTypeNotNull.reduce((acc, cur) => acc + cur.marks, 0) / marksByExaminationTypeNotNull.length;
          const studentMarksForCurrentSubject = this.studentsMarksGroupedBySubject(session).find(m => m.subject._id === subject._id).examinations;
          const studentMarksForCurrentSubjectSorted = studentMarksForCurrentSubject.sort((m1, m2) => m2.meanByTwenty - m1.meanByTwenty);
          const rank = studentMarksForCurrentSubjectSorted.findIndex(m => m.student._id === student._id) + 1;
          const firstRankMean = studentMarksForCurrentSubjectSorted[0].meanByTwenty;
          const appreciation = this.utils.student.appreciationFromMark(meanByTwenty);
          const lastRankMean = studentMarksForCurrentSubjectSorted[studentMarksForCurrentSubjectSorted.length - 1].meanByTwenty;
          return {
            subject,
            totalMarks,
            meanByTwenty,
            coef: meanByTwenty >= 0 ? subject.coefficient : 0,
            rank,
            firstRankMean,
            lastRankMean,
            appreciation,
            meanByCoefficient: meanByTwenty >= 0 ? meanByTwenty * subject.coefficient : 0,
            examinationsByType: marksByExaminationType
          };
        })
      };
    });
  }

  // most important for v2
  // classroomStudentsExamainations(session: SchoolSession) {
  //   this.notesBySubject = {};
  //   return this.classroomStudents.map(student => {
  //     const lastSession = this.schoolYear.sessions[this.schoolYear.sessions.length - 1];
  //     const previousSessionsBulletinsInformations = this.schoolYear.sessions.map(s => this.studentOtherBulletinInformation(student, s));
  //     const annualMean = previousSessionsBulletinsInformations.reduce((acc, cur) => acc + cur.generalMean, 0) / previousSessionsBulletinsInformations.length;
  //     return {
  //       student,
  //       classSize: this.utils.student.classroomStudents(this.classroomSelected).length,
  //       examinationsTypes: this.classroomExaminationTypes.map(t => t.name),
  //       classroom: this.classroomSelected,
  //       schoolYear: this.schoolYear,
  //       term: session.name,
  //       isLastSession: session._id == null ? lastSession.name === session.name : lastSession._id === session._id,
  //       schoolSessions: previousSessionsBulletinsInformations.map(s => ({ sessionName: s.session.name, sessionMean: s.generalMean }) ),
  //       annualMean: annualMean.toFixed(2),
  //       annualRank: this.classroomAnnualMeans(this.classroomSelected).findIndex(mean => mean.student._id === student._id) + 1,
  //       subjects: this.classroomSelected.subjects.map(subject => {
  //         this.notesBySubject[subject._id] = {
  //           subject,
  //         };
  //         const marksByExaminationType = this.marksByExaminationType(student, subject, session);
  //         const marksByExaminationTypeNotNull = marksByExaminationType.filter(m => m.marks != null);
  //         const totalMarks = marksByExaminationTypeNotNull.length <= 0 ? 0 : marksByExaminationTypeNotNull.reduce((acc, cur) => acc + cur.marks, 0);
  //         const meanByTwenty = marksByExaminationTypeNotNull.length <= -1 ? 0 : marksByExaminationTypeNotNull.reduce((acc, cur) => acc + cur.marks, 0) / marksByExaminationTypeNotNull.length;
  //         const studentMarksForCurrentSubject = this.studentsMarksGroupedBySubject(session).find(m => m.subject._id === subject._id).examinations;
  //         const studentMarksForCurrentSubjectSorted = studentMarksForCurrentSubject.sort((m1, m2) => m2.meanByTwenty - m1.meanByTwenty);
  //         const rank = studentMarksForCurrentSubjectSorted.findIndex(m => m.student._id === student._id) + 1;
  //         const firstRankMean = studentMarksForCurrentSubjectSorted[0].meanByTwenty;
  //         const appreciation = this.utils.student.appreciationFromMark(meanByTwenty);
  //         const lastRankMean = studentMarksForCurrentSubjectSorted[studentMarksForCurrentSubjectSorted.length - 1].meanByTwenty;
  //         return {
  //           subject,
  //           totalMarks,
  //           meanByTwenty,
  //           coef: meanByTwenty >= 0 ? subject.coefficient : 0,
  //           rank,
  //           firstRankMean,
  //           lastRankMean,
  //           appreciation,
  //           meanByCoefficient: meanByTwenty >= 0 ? meanByTwenty * subject.coefficient : 0,
  //           examinationsByType: marksByExaminationType
  //         };
  //       })
  //     };
  //   });
  // }

  async printBulletin(student: Student, session: SchoolSession) {
    if (this.canGenerateClassroomBulletin()) {
      let loading;
      try {
      loading = this.utils.common.loading(`Le Bulletin de ${student.firstname} ${student.lastname} est en cours de génération`);
      const marks = this.classroomStudentsExamainations(session);
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
      await this.utils.print.bulletin(currentStudentMarks);
      loading.close();
      } catch (e) {
        console.error(e);
        loading.close();
        this.utils.common.alert(JSON.stringify(e.error));
      }
    }
  }

  setupBulletin(student: Student, session: SchoolSession) {
    const marks = this.classroomStudentsExamainations(session);
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

  async printClassroomBulletins(classroom: Classroom, index: number, session: SchoolSession) {
    this.classroomSelected = classroom;
    this.selected = index;
    let loading;

    if (this.canGenerateClassroomBulletin()) {
      try {
      loading = this.utils.common.loading('Les Bulletins sont en cours de génération');
      await this.utils.common.sleep(300);
      const bulletins = this.classroomStudents.map(student => this.setupBulletin(student, session));

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

  isSessionExamination(examination: Examination, session: SchoolSession) {
    return moment(examination.examinationDate).isBetween(moment(session.startDate), moment(session.endDate), 'day', '[]');
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
