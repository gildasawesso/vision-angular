import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import * as moment from 'moment';
let BulletinsComponent = class BulletinsComponent {
    constructor(classroomsRepository, registrationsRepository, examinationsRepository, schoolyearsRepository, subjectsRepository, bulletinService, schoolsRepository, schoolYearService, services, repo, utils) {
        this.classroomsRepository = classroomsRepository;
        this.registrationsRepository = registrationsRepository;
        this.examinationsRepository = examinationsRepository;
        this.schoolyearsRepository = schoolyearsRepository;
        this.subjectsRepository = subjectsRepository;
        this.bulletinService = bulletinService;
        this.schoolsRepository = schoolsRepository;
        this.schoolYearService = schoolYearService;
        this.services = services;
        this.repo = repo;
        this.utils = utils;
        this.classrooms = [];
        this.registrations = [];
        this.subjects = [];
        this.selected = -1;
        this.studentsMarksByExamination = null;
        this.bulletins = null;
    }
    studentsMarksGroupedBySubject(session) {
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
    rank(subject, examinationType) {
        const examinations = this.classroomExaminations.filter(e => e.subject._id === subject._id && e.type._id === examinationType._id);
    }
    marksByExaminationType(student, subject, session) {
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
    classroomExaminationTypes(classroom) {
        const examinations = this.utils.examination.classroomExaminationTypes(classroom);
        return examinations.sort((e1, e2) => e1.displayOrder - e2.displayOrder);
    }
    selectClassroom(classroom, index) {
        this.selected = index;
        this.classroomSelected = classroom;
    }
    classroomCommonBulletinInformations(classroom, session) {
        var _a, _b, _c;
        const currentSchool = this.schoolsRepository.list[0];
        const madeIn = 'ATROKPOCODJI';
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
        const studentsAllSessionsGeneralMean = this.utils.student.classroomStudents(classroom)
            .map(student => {
            try {
                const studentAnnualNote = this.schoolYearSelected.sessions
                    .map(currentSession => { var _a; return ({ [student._id]: (_a = this.bulletins[currentSession.name][classroom._id].students[student._id]) === null || _a === void 0 ? void 0 : _a.generalMean }); })
                    .reduce((acc, cur) => acc + cur[student._id], 0);
                return {
                    [student._id]: studentAnnualNote / this.schoolYearSelected.sessions.length
                };
            }
            catch (e) {
                return { [student._id]: 0 };
            }
        })
            .sort((aStudentNote, bStudentNote) => Object.values(bStudentNote)[0] - Object.values(aStudentNote)[0]);
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
            bestClassroomMean: (_b = (_a = studentsNotes[firstRankId]) === null || _a === void 0 ? void 0 : _a.generalMean) === null || _b === void 0 ? void 0 : _b.toFixed(2),
            lastClassroomMean: (_c = studentsNotes[lastRankId].generalMean) === null || _c === void 0 ? void 0 : _c.toFixed(2),
            classroomStudentsMarksSorted,
            studentsAllSessionsGeneralMean
        };
    }
    printStudentBulletin(classroom, student, session) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.canGenerateClassroomBulletin()) {
                let loading;
                loading = this.utils.common.loading(`Le Bulletin de ${student.firstname} ${student.lastname} est en cours de génération`);
                try {
                    const commonInfo = this.classroomCommonBulletinInformations(classroom, session);
                    const notes = yield this.processNotes(student, classroom, session, commonInfo);
                    yield this.utils.print.bulletin(notes);
                    loading.close();
                }
                catch (e) {
                    console.error(e);
                    loading.close();
                    this.utils.common.alert('les données sont insuffisantes pour générer les bulletins');
                }
            }
        });
    }
    processNotes(student, classroom, session, commonBulletinInformations) {
        var _a, _b, _c, _d, _e, _f;
        const generalMean = (_a = this.bulletins[session.name][classroom._id].students[student._id]) === null || _a === void 0 ? void 0 : _a.generalMean;
        const currentStudentRealCoef = (_b = this.bulletins[session.name][classroom._id].students[student._id]) === null || _b === void 0 ? void 0 : _b.realCoef;
        const annualStats = commonBulletinInformations.studentsAllSessionsGeneralMean;
        const annualRankIndex = annualStats.findIndex(mean => Object.keys(mean)[0] === student._id);
        let schoolSessions = null;
        let finalStatement = '';
        if (commonBulletinInformations.isLastSession) {
            schoolSessions = this.schoolYearSelected.sessions.map(currentSession => {
                var _a, _b;
                try {
                    return {
                        sessionName: currentSession.name,
                        sessionMean: (_b = (_a = this.bulletins[currentSession.name][classroom._id].students[student._id]) === null || _a === void 0 ? void 0 : _a.generalMean) === null || _b === void 0 ? void 0 : _b.toFixed(2)
                    };
                }
                catch (e) {
                    return {
                        sessionName: currentSession.name,
                        sessionMean: 0
                    };
                }
            });
            const annualMean = (_c = annualStats[annualRankIndex][student._id]) === null || _c === void 0 ? void 0 : _c.toFixed(2);
            finalStatement = annualMean < 10 ? 'Redouble la classe' : 'Passe en classe supérieure';
        }
        let blame = '';
        let excluded = '';
        return Object.assign(Object.assign({ printingDate: commonBulletinInformations.printingDate, madeIn: commonBulletinInformations.madeIn, schoolYear: commonBulletinInformations.schoolYear, classSize: commonBulletinInformations.classSize }, commonBulletinInformations.examinationTypesToDisplay), { schoolName: commonBulletinInformations.schoolName, schoolSubName: commonBulletinInformations.schoolSubName, isLastSession: commonBulletinInformations.isLastSession, totalCoef: currentStudentRealCoef, student, matricule: student.matricule, studentFullName: student.firstname + ' ' + student.lastname, sex: student.gender, status: '', classroom: classroom.name, sessionsReport: null, term: session.name.toUpperCase(), examinationsTypes: this.classroomExaminationTypes(classroom).map(t => t.name), totalPoints: (_e = (_d = this.bulletins[session.name][classroom._id].students[student._id]) === null || _d === void 0 ? void 0 : _d.grandTotal) === null || _e === void 0 ? void 0 : _e.toFixed(2), generalMean: generalMean.toFixed(2), generalMeanInLetter: this.utils.common.decimalToLetter(generalMean.toFixed(2)), bestClassroomMean: commonBulletinInformations.bestClassroomMean, lastClassroomMean: commonBulletinInformations.lastClassroomMean, mainRank: commonBulletinInformations.classroomStudentsMarksSorted.findIndex(studentId => studentId === student._id) + 1, generalAppreciation: this.utils.student.appreciationFromMark(generalMean), congratulations: generalMean >= 14 ? 'X' : '', encouragement: parseInt(generalMean, 10) === 13 ? 'X' : '', honor: parseInt(generalMean, 10) === 12 ? 'X' : '', warning: generalMean < 7 ? 'X' : '', schoolSessions, annualMean: (_f = annualStats[annualRankIndex][student._id]) === null || _f === void 0 ? void 0 : _f.toFixed(2), annualRank: annualRankIndex + 1, subjects: this.classroomSelected.subjects.map(subject => {
                var _a, _b, _c, _d, _e, _f, _g;
                const classroomMarksForCurrentSubject = (_a = this.bulletins[session.name][classroom._id].subjects[subject._id]) === null || _a === void 0 ? void 0 : _a.students;
                const studentMarksForCurrentSubject = (_b = this.bulletins[session.name][classroom._id].subjects[subject._id]) === null || _b === void 0 ? void 0 : _b.students[student._id];
                if (studentMarksForCurrentSubject === undefined || studentMarksForCurrentSubject == null) {
                    const subjectMarks = {};
                    commonBulletinInformations.examinationsTypes.forEach((examinationType, index) => {
                        subjectMarks[`mark${index + 1}`] = '-';
                    });
                    return Object.assign(Object.assign({ name: subject.code, coef: '-' }, subjectMarks), { meanByTwenty: '-', meanByCoefficient: '-', firstRankMean: '-', lastRankMean: '-', rank: '-', appreciation: '' });
                }
                const studentsMarksSorted = Object.keys(classroomMarksForCurrentSubject).sort((a, b) => classroomMarksForCurrentSubject[b].mean - classroomMarksForCurrentSubject[a].mean);
                const currentSubjectFirstRankStudentId = studentsMarksSorted[0];
                const currentSubjectLastRankStudentId = studentsMarksSorted[studentsMarksSorted.length - 1];
                const meanByTwenty = (_c = classroomMarksForCurrentSubject[student._id]) === null || _c === void 0 ? void 0 : _c.mean;
                const marks = {};
                commonBulletinInformations.examinationsTypes.forEach((examinationType, index) => {
                    try {
                        marks[`mark${index + 1}`] = this.bulletins[session.name][classroom._id].subjects[subject._id].examinationTypes[examinationType._id].students[student._id].mean;
                        if (marks[`mark${index + 1}`] === undefined) {
                            marks[`mark${index + 1}`] = '-';
                        }
                    }
                    catch (e) {
                        return marks[`mark${index + 1}`] = '-';
                    }
                });
                const currentSubjectIsConduite = subject.name.toLowerCase().startsWith('conduite');
                if (currentSubjectIsConduite) {
                    blame = meanByTwenty < 10 ? 'X' : '';
                    excluded = meanByTwenty < 9 ? 'X' : '';
                }
                return Object.assign(Object.assign({ name: subject.code, coef: subject.coefficient }, marks), { meanByTwenty: meanByTwenty.toFixed(2), meanByCoefficient: (meanByTwenty * subject.coefficient).toFixed(2), firstRankMean: (_e = (_d = classroomMarksForCurrentSubject[currentSubjectFirstRankStudentId]) === null || _d === void 0 ? void 0 : _d.mean) === null || _e === void 0 ? void 0 : _e.toFixed(2), lastRankMean: (_g = (_f = classroomMarksForCurrentSubject[currentSubjectLastRankStudentId]) === null || _f === void 0 ? void 0 : _f.mean) === null || _g === void 0 ? void 0 : _g.toFixed(2), rank: studentsMarksSorted.findIndex(studentsId => studentsId === student._id) + 1, appreciation: this.utils.student.appreciationFromMark(meanByTwenty) });
            }), blame,
            excluded,
            finalStatement });
    }
    printClassroomBulletins(classroom, index, session) {
        return __awaiter(this, void 0, void 0, function* () {
            this.classroomSelected = classroom;
            this.selected = index;
            let loading;
            if (this.canGenerateClassroomBulletin()) {
                try {
                    loading = this.utils.common.loading('Les Bulletins sont en cours de génération');
                    yield this.utils.common.sleep(300);
                    const commonBulletinInfo = this.classroomCommonBulletinInformations(this.classroomSelected, session);
                    const bulletins = this.classroomStudents.map(student => this.processNotes(student, this.classroomSelected, session, commonBulletinInfo));
                    yield this.utils.print.classroomBulletin(bulletins);
                    loading.close();
                }
                catch (e) {
                    this.utils.common.alert(JSON.stringify(e.error));
                    loading.close();
                }
            }
        });
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
    isSessionExamination(examination, session) {
        return moment(examination.examinationDate).isBetween(moment(session.startDate), moment(session.endDate), 'day', '[]');
    }
    ngOnInit() {
        this.services.work.started('Récupération des bulletins en cours...');
        this.classroomsRepository.stream
            .subscribe(classrooms => this.classrooms = classrooms);
        this.registrationsRepository.stream
            .subscribe(registrations => this.registrations = registrations);
        this.schoolyearsRepository.stream.subscribe(schoolYears => this.schoolYear = schoolYears[0]);
        this.schoolYearService.schoolYear.subscribe(sySelected => this.schoolYearSelected = sySelected);
        this.subjectsRepository.stream
            .subscribe(subjects => this.subjects = subjects);
        this.bulletinService.bulletin
            .subscribe(bulletins => {
            if (bulletins == null)
                return;
            this.bulletins = bulletins;
            this.services.work.ended();
        });
    }
};
BulletinsComponent = __decorate([
    Component({
        selector: 'app-bulletins',
        templateUrl: './bulletins.component.html',
        styleUrls: ['./bulletins.component.scss']
    })
], BulletinsComponent);
export { BulletinsComponent };
//# sourceMappingURL=bulletins.component.js.map