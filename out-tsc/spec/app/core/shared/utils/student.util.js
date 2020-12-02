import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let StudentUtil = class StudentUtil {
    constructor(commonUtil) {
        this.commonUtil = commonUtil;
        this.examinations = [];
        this.registrations = [];
        this.payments = [];
        this.classrooms = [];
        this.classroomPayments = {};
    }
    sortFn(s1, s2) {
        return s1.lastname.localeCompare(s2.lastname);
    }
    allStudents(allPayments, schoolYear) {
        return this.registrations.filter(r => r.schoolYear._id === this.currentSchoolYear._id);
    }
    studentRegistration(student) {
        return this.registrations.find(r => r.student ? r.student._id === student._id : false);
    }
    classroomRegistrations(classroom) {
        if (classroom == null) {
            return this.registrations;
        }
        return this.registrations.filter(r => {
            return r.classroom._id === classroom._id;
        });
    }
    classroomStudents(classroom) {
        return this.classroomRegistrations(classroom)
            .filter(r => r.student != null)
            .map(r => r.student)
            .sort(this.commonUtil.dynamicSort('lastname'));
    }
    allStudentsPaymentsWithOtherPayments(payments, schoolYear) {
        const subPayments = payments.map(payment => payment.paymentLines);
        const subPaymentsFlattened = subPayments.reduce((acc, cur) => {
            acc = [...acc, ...cur];
            return acc;
        }, []);
        return subPaymentsFlattened.reduce((acc, cur) => acc + cur.amount, 0);
    }
    appreciationFromMark(mark) {
        switch (true) {
            case mark <= 3.99:
                return 'Très faible';
            case mark <= 7.99:
                return 'Faible';
            case mark <= 9.99:
                return 'Insuffisant';
            case mark <= 11.99:
                return 'Passable';
            case mark <= 13.99:
                return 'Assez-Bien';
            case mark <= 15.99:
                return 'Bien';
            case mark <= 17.99:
                return 'Très Bien';
            case mark <= 20:
                return 'Excellent';
        }
    }
    classroomExaminations(classroom) {
        return this.examinations.filter(e => e.classroom._id === classroom._id);
    }
    flatSubPayments(fees) {
        return fees.reduce((acc, cur) => {
            acc = [...acc, ...cur];
            return acc;
        }, []);
    }
};
StudentUtil = __decorate([
    Injectable()
], StudentUtil);
export { StudentUtil };
//# sourceMappingURL=student.util.js.map