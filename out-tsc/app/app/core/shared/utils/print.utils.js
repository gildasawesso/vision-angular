import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as moment from 'moment';
moment.locale('fr');
let PrintUtil = class PrintUtil {
    constructor(dialog, snackBar, api, studentUtils, commonUtils, paymentUtil, repo, schoolYearService, work) {
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.api = api;
        this.studentUtils = studentUtils;
        this.commonUtils = commonUtils;
        this.paymentUtil = paymentUtil;
        this.repo = repo;
        this.schoolYearService = schoolYearService;
        this.work = work;
    }
    spaced(value, suffix = '') {
        if (value === undefined || value == null) {
            return value;
        }
        return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + suffix;
    }
    bulletin(notes) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                body: this.processNotes(notes),
                responseType: 'blob'
            };
            const file = yield this.api.request('post', `/report/print/bulletin-${notes.examinationsTypes.length}-notes`, options).toPromise();
            this.download(file);
        });
    }
    processNotes(notes) {
        return notes;
        // const currentSchool = this.schools.list[0];
        const examTypes = {};
        const isReRegistration = this.studentUtils.studentRegistration(notes.student).isReregistration;
        const totalCoef = notes.subjects.reduce((acc, cur) => acc + cur.coef, 0);
        const totalPoints = notes.subjects.reduce((acc, cur) => acc + Number(cur.meanByCoefficient), 0).toFixed(2);
        const generalMean = (Number(totalPoints) / Number(totalCoef)).toFixed(2);
        let blame = '';
        const blameSubjectMark = notes.subjects.find(s => s.subject.name.split(' ')[0].toLowerCase() === 'conduite');
        if (blameSubjectMark) {
            const blameMeanByTwenty = blameSubjectMark.meanByTwenty;
            blame = blameMeanByTwenty < 10 ? 'X' : '';
        }
        notes.examinationsTypes.forEach((e, index) => {
            examTypes[`examType${index + 1}`] = e;
        });
        return Object.assign(Object.assign({ examinationTypes: notes.examinationsTypes, classSize: notes.classSize, director: 'ATROKPOCODJI', isLastSession: notes.isLastSession, 
            // todo get date from server
            printingDate: moment().format('DD MMMM YYYY'), generalAppreciation: this.studentUtils.appreciationFromMark(Number(generalMean)), 
            // status: isReRegistration ? 'Doublant' : 'Passant',
            status: '', generalMeanInLetter: this.commonUtils.decimalToLetter(generalMean), term: notes.term.toUpperCase(), schoolYear: moment(notes.schoolYear.startDate).format('YYYY') + ' - ' + moment(notes.schoolYear.endDate).format('YYYY'), classroom: notes.classroom.name }, examTypes), { totalPoints,
            totalCoef, mainRank: notes.mainRank, bestClassroomMean: notes.bestClassroomMean, lastClassroomMean: notes.lastClassroomMean, generalMean, annualMean: notes.annualMean, annualRank: notes.annualRank, congratulations: Number(generalMean) >= 14 ? 'X' : '', encouragement: parseInt(generalMean, 10) === 13 ? 'X' : '', honor: parseInt(generalMean, 10) === 12 ? 'X' : '', warning: Number(generalMean) < 7 ? 'X' : '', blame, finalStatement: notes.finalStatement, excluded: blameSubjectMark.meanByTwenty < 9 ? 'X' : '', subjects: notes.subjects.map(subjectAndExaminationType => {
                const marks = {};
                subjectAndExaminationType.examinationsByType.forEach((s, index) => {
                    marks[`mark${index + 1}`] = s.marks === undefined || s.marks == null ? '-' : s.marks;
                });
                return Object.assign({ name: subjectAndExaminationType.subject.code, meanByTwenty: subjectAndExaminationType.meanByTwenty >= 0 ? subjectAndExaminationType.meanByTwenty.toFixed(2) : '-', coef: subjectAndExaminationType.meanByTwenty >= 0 ? subjectAndExaminationType.coef : '-', rank: subjectAndExaminationType.meanByTwenty >= 0 ? subjectAndExaminationType.rank : '-', firstRankMean: subjectAndExaminationType.firstRankMean.toFixed(2), lastRankMean: subjectAndExaminationType.lastRankMean.toFixed(2), meanByCoefficient: subjectAndExaminationType.meanByTwenty >= 0 ? subjectAndExaminationType.meanByCoefficient.toFixed(2) : '-', appreciation: subjectAndExaminationType.meanByTwenty >= 0 ? subjectAndExaminationType.appreciation : '' }, marks);
            }) });
    }
    classroomBulletin(notesArray) {
        return __awaiter(this, void 0, void 0, function* () {
            const notesArrayProccessed = notesArray.map(notes => {
                console.log(notes);
                return this.processNotes(notes);
            });
            const options = {
                body: notesArrayProccessed,
                responseType: 'blob'
            };
            const file = yield this.api.request('post', `/report/print/multiple`, options).toPromise();
            this.download(file);
        });
    }
    registrationReceipt(payment) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.work.started(`Impresssion de la facture en cours`);
            const student = yield this.repo.students.one(payment.student);
            const classroom = yield this.repo.classrooms.one(payment.classroom);
            const school = yield this.repo.schools.one(payment.school);
            const studentPayments = yield this.repo.payments.studentPayments(payment.student);
            const studentReductions = yield this.repo.registrations.studentReductions(payment.student);
            const schoolYear = yield this.schoolYearService.snapshot;
            const paymentLines = yield Promise.all(payment.paymentLines.map((line, index) => __awaiter(this, void 0, void 0, function* () {
                console.log(line);
                const fee = yield this.repo.fees.one(line.feeId);
                const pastPayments = this.paymentUtil.studentPastPayments(fee._id, studentPayments);
                const reduction = this.paymentUtil.reduction(fee, studentReductions);
                return {
                    designation: fee.name,
                    amount: fee.amount,
                    reduction,
                    payed: line.amount,
                    oldPayments: pastPayments - line.amount,
                    balance: fee.amount - (reduction + pastPayments),
                };
            })));
            const data = {
                code: payment.code,
                createdAt: payment.paymentDate ? moment(payment.paymentDate).format('DD MMMM YYYY') : moment(payment.createdAt).format('DD MMMM YYYY'),
                schoolYear: moment(schoolYear.startDate).format('YYYY') + ' - ' + moment(schoolYear.endDate).format('YYYY'),
                schoolName: school.name,
                schoolAddress: school.zipCode,
                schoolPhone: school.phone,
                schoolMobile: school.mobile,
                schoolEmail: school.email,
                studentFullName: student.firstname + ' ' + student.lastname,
                studentAddress: (_a = student.address) !== null && _a !== void 0 ? _a : '',
                classroom: classroom.name,
                fees: paymentLines.map((line, index) => {
                    return {
                        designation: line.designation,
                        amount: this.spaced(line.amount),
                        reduction: this.spaced(line.reduction),
                        payed: this.spaced(line.payed),
                        oldPayments: this.spaced(line.oldPayments),
                        balance: this.spaced(line.balance)
                    };
                }),
                totalAmount: this.spaced(paymentLines.reduce((acc, cur) => acc + cur.amount, 0), 'FCFA'),
                totalReduction: this.spaced(paymentLines.reduce((acc, cur) => acc + cur.reduction, 0), 'FCFA'),
                totalPayed: this.spaced(paymentLines.reduce((acc, cur) => acc + cur.payed, 0), 'FCFA'),
                totalOldPayments: this.spaced(paymentLines.reduce((acc, cur) => acc + cur.oldPayments, 0), 'FCFA'),
                totalBalance: this.spaced(paymentLines.reduce((acc, cur) => acc + cur.balance, 0), 'FCFA'),
            };
            const options = {
                body: data,
                responseType: 'blob'
            };
            const file = yield this.api.request('post', '/report/print/registration', options).toPromise();
            this.download(file);
            this.work.ended();
        });
    }
    download(blob) {
        const url = URL.createObjectURL(blob);
        window.open(url);
    }
    excel(data, header) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                body: { data, header },
                responseType: 'blob'
            };
            const file = yield this.api.request('post', `/report/print/excel`, options).toPromise();
            this.download(file);
        });
    }
};
PrintUtil = __decorate([
    Injectable()
], PrintUtil);
export { PrintUtil };
//# sourceMappingURL=print.utils.js.map