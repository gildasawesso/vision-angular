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
import {BulletinService} from '../../core/services/bulletin.service';
import {SchoolsRepository} from '../../core/repositories/schools.repository';
import {SchoolYearService} from '../../core/services/school-year.service';
import {Services} from '../../core/services/services';
import {Repositories} from '../../core/repositories/repositories';

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
  schoolYearSelected: SchoolYear;
  selected = -1;
  classroomSelected: Classroom;
  notesBySubject: any;
  studentsMarksByExamination = null;
  bulletins: any = null;
  classroomStudents: Student[] = [];

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

  rank(subject: Subject, examinationType: ExaminationType) {
    const examinations = this.classroomExaminations.filter(e => e.subject._id === subject._id && e.type._id === examinationType._id);

  }

  marksByExaminationType(student: Student, subject: Subject, session: SchoolSession) {
    return this.classroomExaminationTypes(this.classroomSelected).map(type => {
      const currentSubjectAndTypeExaminations = this.classroomExaminations.filter(e => e.subject._id === subject._id && e.type._id === type._id && this.isSessionExamination(e, session));

      let subjectsToRemove = 0;
      const marksSum = currentSubjectAndTypeExaminations.reduce((acc, cur) => {
        const markObject = cur.marks.find(m => m.student._id === student._id);
        if (markObject === undefined) {
          subjectsToRemove += 1;
          return acc;
        }

        const mark = markObject.mark;
        if (mark == null) {
          subjectsToRemove += 1;
        }
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
        examinationsByType: this.classroomExaminationTypes(this.classroomSelected).map(type => {
          return {
            examinationType: type,
            examinations: subjectAndExaminations.examinations.filter(e => e.type._id === type._id)
          };
        })
      };
    });
  }

  classroomExaminationTypes(classroom: Classroom) {
    const examinations = this.utils.examination.classroomExaminationTypes(classroom);
    return examinations.sort((e1, e2) => e1.displayOrder - e2.displayOrder);
  }

  constructor(private classroomsRepository: ClassroomsRepository,
              private registrationsRepository: RegistrationsRepository,
              private examinationsRepository: ExaminationsRepository,
              private schoolyearsRepository: SchoolyearsRepository,
              private subjectsRepository: SubjectsRepository,
              private bulletinService: BulletinService,
              private schoolsRepository: SchoolsRepository,
              public schoolYearService: SchoolYearService,
              private services: Services,
              private repo: Repositories,
              private utils: Utils) {
  }

  async selectClassroom(classroom: Classroom, index: number) {
    this.selected = index;
    this.classroomSelected = await this.repo.classrooms.one(classroom._id);
    console.log(this.classroomSelected);
    this.classroomStudents = await this.repo.classrooms.classroomStudents(classroom._id);
  }

  async classroomCommonBulletinInformations(classroom: Classroom, session: SchoolSession) {
    const user = await this.services.auth.getCurrentUser();
    const currentSchoolId = user.schools[0];
    const currentSchool = await this.repo.schools.one(currentSchoolId);
    const madeIn = 'ATROKPOCODJI';
    const lastSession = this.schoolYear.sessions[this.schoolYear.sessions.length - 1];
    const printingDate = moment().format('DD MMMM YYYY');
    const classSize = this.classroomStudents.length;
    const schoolYear = moment(this.schoolYearSelected.startDate).format('YYYY') + ' - ' + moment(this.schoolYearSelected.endDate).format('YYYY');
    const totalCoef = classroom.subjects.reduce((acc, cur) => acc + cur.coefficient, 0);
    const examinationsTypes = this.repo.examTypes.snapshot;
    const examinationsTypesNames = examinationsTypes.map(t => t.name);
    const examinationTypesToDisplay = {};
    examinationsTypesNames.forEach((e, index) => examinationTypesToDisplay[`examType${index + 1}`] = e);
    const studentsNotes = this.bulletins[session.name][classroom._id].students;
    const classroomStudentsMarksSorted = Object.keys(studentsNotes).sort((a, b) => studentsNotes[b].generalMean - studentsNotes[a].generalMean);
    const firstRankId = classroomStudentsMarksSorted[0];
    const lastRankId = classroomStudentsMarksSorted[classroomStudentsMarksSorted.length - 1];
    const studentsAllSessionsGeneralMean = (await this.repo.classrooms.classroomStudents(classroom._id))
      .map(student => {
        try {
          const studentAnnualNote =  this.schoolYearSelected.sessions
            .map(currentSession => ({[student._id]: this.bulletins[currentSession.name][classroom._id].students[student._id]?.generalMean}))
            .reduce((acc, cur) => acc + cur[student._id], 0);
          return {
            [student._id]: studentAnnualNote / this.schoolYearSelected.sessions.length
          };
        } catch (e) {
          return {[student._id]: 0};
        }
      })
      .sort((aStudentNote, bStudentNote) => Number(Object.values(bStudentNote)[0]) - Number(Object.values(aStudentNote)[0]));

    return {
      madeIn,
      printingDate,
      classSize,
      schoolYear,
      examinationTypesToDisplay,
      totalCoef,
      examinationsTypes,
      examinationsTypesNames,
      schoolName: currentSchool.name,
      schoolSubName: currentSchool.subName,
      isLastSession: session._id == null ? lastSession.name === session.name : lastSession._id === session._id,
      bestClassroomMean: studentsNotes[firstRankId]?.generalMean?.toFixed(2),
      lastClassroomMean: studentsNotes[lastRankId].generalMean?.toFixed(2),
      classroomStudentsMarksSorted,
      studentsAllSessionsGeneralMean
    };
  }

  async printStudentBulletin(classroom: Classroom, student: Student, session: SchoolSession) {
    if (this.canGenerateClassroomBulletin()) {
      this.services.work.started(`Le Bulletin de ${student.firstname} ${student.lastname} est en cours de génération`);
      try {
        const commonInfo = await this.classroomCommonBulletinInformations(classroom, session);
        const notes = await this.processNotes(student, classroom, session, commonInfo);
        await this.utils.print.bulletin(notes);
        this.services.work.ended();
      } catch (e) {
        console.error(e);
        this.services.work.ended();
        this.utils.common.alert('les données sont insuffisantes pour générer les bulletins');
      }
    }
  }

  processNotes(student: Student, classroom: Classroom, session: SchoolSession, commonBulletinInformations: any) {
    const generalMean = this.bulletins[session.name][classroom._id].students[student._id]?.generalMean;
    const currentStudentRealCoef = this.bulletins[session.name][classroom._id].students[student._id]?.realCoef;
    const annualStats = commonBulletinInformations.studentsAllSessionsGeneralMean;
    const annualRankIndex = annualStats.findIndex(mean => Object.keys(mean)[0] === student._id);
    let schoolSessions = null;
    let finalStatement = '';
    if (commonBulletinInformations.isLastSession) {
      schoolSessions = this.schoolYearSelected.sessions.map(currentSession => {
        try {
          return {
            sessionName: currentSession.name,
            sessionMean: this.bulletins[currentSession.name][classroom._id].students[student._id]?.generalMean?.toFixed(2)
          };
        } catch (e) {
          return {
            sessionName: currentSession.name,
            sessionMean: 0
          };
        }
      });

      const annualMean = annualStats[annualRankIndex][student._id]?.toFixed(2);
      finalStatement = annualMean < 10 ? 'Redouble la classe' : 'Passe en classe supérieure';
    }
    let blame = '';
    let excluded = '';
    return {
      printingDate: commonBulletinInformations.printingDate,
      madeIn: commonBulletinInformations.madeIn,
      schoolYear: commonBulletinInformations.schoolYear,
      classSize: commonBulletinInformations.classSize,
      ...commonBulletinInformations.examinationTypesToDisplay,
      schoolName: commonBulletinInformations.schoolName,
      schoolSubName: commonBulletinInformations.schoolSubName,
      isLastSession: commonBulletinInformations.isLastSession,
      totalCoef: currentStudentRealCoef,
      student,
      matricule: student.matricule,
      studentFullName: student.firstname + ' ' + student.lastname,
      sex: student.gender,
      status: '',
      classroom: classroom.name,
      sessionsReport: null,
      term: session.name.toUpperCase(),
      examinationsTypes: this.repo.examTypes.snapshot.map(t => t.name),
      totalPoints: this.bulletins[session.name][classroom._id].students[student._id]?.grandTotal?.toFixed(2),
      generalMean: generalMean.toFixed(2),
      generalMeanInLetter: this.utils.common.decimalToLetter(generalMean.toFixed(2)),
      bestClassroomMean: commonBulletinInformations.bestClassroomMean,
      lastClassroomMean: commonBulletinInformations.lastClassroomMean,
      mainRank: commonBulletinInformations.classroomStudentsMarksSorted.findIndex(studentId => studentId === student._id) + 1,
      generalAppreciation: this.utils.student.appreciationFromMark(generalMean),
      congratulations: generalMean >= 14 ? 'X' : '',
      encouragement: parseInt(generalMean, 10) === 13 ? 'X' : '',
      honor: parseInt(generalMean, 10) === 12 ? 'X' : '',
      warning: generalMean < 7 ? 'X' : '',
      schoolSessions,
      annualMean: annualStats[annualRankIndex][student._id]?.toFixed(2),
      annualRank: annualRankIndex + 1,
      subjects: this.classroomSelected._subjects.map(subject => {
        const classroomMarksForCurrentSubject = this.bulletins[session.name][classroom._id].subjects[subject._id]?.students;
        const studentMarksForCurrentSubject = this.bulletins[session.name][classroom._id].subjects[subject._id]?.students[student._id];

        if (studentMarksForCurrentSubject === undefined || studentMarksForCurrentSubject == null) {
          const subjectMarks = {};
          commonBulletinInformations.examinationsTypes.forEach((examinationType, index) => {
            subjectMarks[`mark${index + 1}`] = '-';
          });
          return {
            name: subject.code,
            coef: '-',
            ...subjectMarks,
            meanByTwenty: '-',
            meanByCoefficient: '-',
            firstRankMean: '-',
            lastRankMean: '-',
            rank: '-',
            appreciation: ''
          };
        }
        const studentsMarksSorted = Object.keys(classroomMarksForCurrentSubject).sort((a, b) => classroomMarksForCurrentSubject[b].mean - classroomMarksForCurrentSubject[a].mean);
        const currentSubjectFirstRankStudentId = studentsMarksSorted[0];
        const currentSubjectLastRankStudentId = studentsMarksSorted[studentsMarksSorted.length - 1];
        const meanByTwenty = classroomMarksForCurrentSubject[student._id]?.mean;
        const marks = {};
        commonBulletinInformations.examinationsTypes.forEach((examinationType, index) => {
          try {
            marks[`mark${index + 1}`] = this.bulletins[session.name][classroom._id].subjects[subject._id].examinationTypes[examinationType._id].students[student._id].mean;
            if (marks[`mark${index + 1}`] === undefined) {
              marks[`mark${index + 1}`] = '-';
            }
          } catch (e) {
            return marks[`mark${index + 1}`] = '-';
          }
        });
        const currentSubjectIsConduite = subject.name.toLowerCase().startsWith('conduite');
        if (currentSubjectIsConduite) {
          blame = meanByTwenty < 10 ? 'X' : '';
          excluded = meanByTwenty < 9 ? 'X' : '';
        }

        return {
          name: subject.code,
          coef: subject.coefficient,
          ...marks,
          meanByTwenty: meanByTwenty.toFixed(2),
          meanByCoefficient: (meanByTwenty * subject.coefficient).toFixed(2),
          firstRankMean: classroomMarksForCurrentSubject[currentSubjectFirstRankStudentId]?.mean?.toFixed(2),
          lastRankMean: classroomMarksForCurrentSubject[currentSubjectLastRankStudentId]?.mean?.toFixed(2),
          rank: studentsMarksSorted.findIndex(studentsId => studentsId === student._id) + 1,
          appreciation: this.utils.student.appreciationFromMark(meanByTwenty)
        };
      }),
      blame,
      excluded,
      finalStatement
    };
  }

  async printClassroomBulletins(classroom: Classroom, index: number, session: SchoolSession) {
    this.classroomSelected = await this.repo.classrooms.one(classroom._id);
    this.selected = index;

    if (this.canGenerateClassroomBulletin()) {
      try {
        this.services.work.started('Les Bulletins sont en cours de génération');
        await this.utils.common.sleep(300);
        const commonBulletinInfo = await this.classroomCommonBulletinInformations(this.classroomSelected, session);
        // debugger;
        const bulletins = this.classroomStudents.map(student => this.processNotes(student, this.classroomSelected, session, commonBulletinInfo));
        console.log('classroom bulletins', bulletins);
        try {
          await this.utils.print.classroomBulletin(bulletins);
        } catch (e) {
          console.log(JSON.stringify(e));
          this.utils.common.alert(JSON.stringify(e.error), 'Une erreur est survenue lors de l\'impression');
        }
        this.services.work.ended();
      } catch (e) {
        this.utils.common.alert(JSON.stringify(e.error), 'Une erreur est survenue');
        console.log(JSON.stringify(e));
        this.services.work.ended();
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

    this.schoolyearsRepository.stream.subscribe(schoolYears => this.schoolYear = schoolYears[0]);
    this.schoolYearService.schoolYear.subscribe(sySelected => this.schoolYearSelected = sySelected);

    this.subjectsRepository.stream
      .subscribe(subjects => this.subjects = subjects);

    this.bulletinService.bulletins
      .subscribe(bulletins => {
        if (bulletins == null) return;
        this.bulletins = bulletins;
        this.services.work.ended();
      });
  }
}
