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
  examinations: Examination[] = [];
  selected = -1;
  classroomSelected: Classroom;
  notesBySubject: any;
  studentsMarksByExamination = null;
  bulletins: any = null;

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
              private utils: Utils) {
  }

  selectClassroom(classroom: Classroom, index: number) {
    this.selected = index;
    this.classroomSelected = classroom;
  }

  classroomCommonBulletinInformations(classroom: Classroom, session: SchoolSession) {
    const currentSchool = this.schoolsRepository.list[0];
    const madeIn =  'ATROKPOCODJI';
    const lastSession = this.schoolYear.sessions[this.schoolYear.sessions.length - 1];
    const printingDate = moment().format('DD MMMM YYYY');
    const classSize = this.utils.student.classroomStudents(classroom).length;
    const schoolYear = moment(this.schoolYearSelected.startDate).format('YYYY') + ' - ' + moment(this.schoolYearSelected.endDate).format('YYYY');
    const totalCoef = classroom.subjects.reduce((acc, cur) => acc + cur.coefficient, 0);
    const examinationsTypes = this.classroomExaminationTypes(classroom);
    const examinationsTypesNames = examinationsTypes.map(t => t.name);
    const examinationTypesToDisplay = {};
    examinationsTypesNames.forEach((e, index) => examinationTypesToDisplay[`examType${index + 1}`] = e);
    const studentsNotes = this.bulletins[session.name][classroom._id].students;
    const classroomStudentsMarksSorted = Object.keys(studentsNotes).sort((a, b) => studentsNotes[b].generalMean - studentsNotes[a].generalMean);
    const firstRankId = classroomStudentsMarksSorted[0];
    const lastRankId = classroomStudentsMarksSorted[classroomStudentsMarksSorted.length - 1];

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
      classroomStudentsMarksSorted
    };
  }

  async printStudentBulletin(classroom: Classroom, student: Student, session: SchoolSession) {
    if (this.canGenerateClassroomBulletin()) {
      let loading;
      loading = this.utils.common.loading(`Le Bulletin de ${student.firstname} ${student.lastname} est en cours de génération`);
      try {
        const commonInfo = this.classroomCommonBulletinInformations(classroom, session);
        const notes = await this.processNotes(student, classroom, session, commonInfo);
        await this.utils.print.bulletin(notes);
        loading.close();
      } catch (e) {
        console.error(e);
        loading.close();
        this.utils.common.alert('les données sont insuffisantes pour générer les bulletins');
      }
    }
  }

  processNotes(student: Student, classroom: Classroom, session: SchoolSession, commonBulletinInformations: any) {
    const generalMean = this.bulletins[session.name][classroom._id].students[student._id]?.generalMean;
    let blame = '';
    return {
      printingDate: commonBulletinInformations.printingDate,
      madeIn: commonBulletinInformations.madeIn,
      schoolYear: commonBulletinInformations.schoolYear,
      classSize: commonBulletinInformations.classSize,
      ...commonBulletinInformations.examinationTypesToDisplay,
      schoolName: commonBulletinInformations.schoolName,
      schoolSubName: commonBulletinInformations.schoolSubName,
      totalCoef: commonBulletinInformations.totalCoef,
      student,
      matricule: student.matricule,
      studentFullName: student.firstname + ' ' + student.lastname,
      sex: student.gender,
      status: '',
      classroom: classroom.name,
      sessionsReport: null,
      term: session.name.toUpperCase(),
      examinationsTypes: this.classroomExaminationTypes(classroom).map(t => t.name),
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
      subjects: this.classroomSelected.subjects.map(subject => {
        const classroomMarksForCurrentSubject = this.bulletins[session.name][classroom._id].subjects[subject._id]?.students;
        const studentMarksForCurrentSubject = this.bulletins[session.name][classroom._id].subjects[subject._id]?.students[student._id];

        if (studentMarksForCurrentSubject === undefined || studentMarksForCurrentSubject == null) {
          const subjectMarks = {};
          commonBulletinInformations.examinationsTypes.forEach((examinationType, index) => {
            subjectMarks[`mark${index + 1}`] = '-';
          });
          return {
            name: subject.code,
            coef: subject.coefficient,
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
    };
  }

  async printClassroomBulletins(classroom: Classroom, index: number, session: SchoolSession) {
    this.classroomSelected = classroom;
    this.selected = index;
    let loading;

    if (this.canGenerateClassroomBulletin()) {
      try {
      loading = this.utils.common.loading('Les Bulletins sont en cours de génération');
      await this.utils.common.sleep(300);
      const commonBulletinInfo = this.classroomCommonBulletinInformations(this.classroomSelected, session);
      const bulletins = this.classroomStudents.map(student => this.processNotes(student, this.classroomSelected, session, commonBulletinInfo));
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

    this.schoolyearsRepository.stream.subscribe(schoolYears => this.schoolYear = schoolYears[0]);
    this.schoolyearsRepository.selectedSchoolYear.subscribe(schoolYear => this.schoolYearSelected = schoolYear);

    this.subjectsRepository.stream
      .subscribe(subjects => this.subjects = subjects);

    this.bulletinService.getBulletins()
      .subscribe(bulletins => {
        this.bulletins = bulletins;
        console.log(bulletins);
      });
  }

}
