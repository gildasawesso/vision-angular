import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ExaminationUtil = class ExaminationUtil {
    constructor() {
        this.examinations = [];
    }
    classroomExaminations(classroom) {
        return this.examinations.filter(e => e.classroom._id === classroom._id);
    }
    classroomExaminationTypes(classroom) {
        const examinationTypes = [];
        this.examinations.forEach(examination => {
            if (!this.examinationTypeAlreadyAdded(examination, examinationTypes)) {
                examinationTypes.push(examination.type);
            }
        });
        return examinationTypes;
    }
    examinationTypeAlreadyAdded(examination, examinationTypes) {
        return examinationTypes.find(et => et._id === examination.type._id) !== undefined;
    }
};
ExaminationUtil = __decorate([
    Injectable()
], ExaminationUtil);
export { ExaminationUtil };
//# sourceMappingURL=examination.util.js.map