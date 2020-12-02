import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let Repositories = class Repositories {
    constructor(students, schools, payments, registrations, fees, classrooms, transactions, exams, examTypes, transactionTypes) {
        this.students = students;
        this.schools = schools;
        this.payments = payments;
        this.registrations = registrations;
        this.fees = fees;
        this.classrooms = classrooms;
        this.transactions = transactions;
        this.exams = exams;
        this.examTypes = examTypes;
        this.transactionTypes = transactionTypes;
    }
};
Repositories = __decorate([
    Injectable({
        providedIn: 'root'
    })
], Repositories);
export { Repositories };
//# sourceMappingURL=repositories.js.map