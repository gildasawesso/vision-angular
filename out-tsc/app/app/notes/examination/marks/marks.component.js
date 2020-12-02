import { __awaiter, __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let MarksComponent = class MarksComponent {
    constructor(data, examinationsRepository, dialogRef, repo, utils) {
        this.data = data;
        this.examinationsRepository = examinationsRepository;
        this.dialogRef = dialogRef;
        this.repo = repo;
        this.utils = utils;
        this.searchTerm = '';
        this.examinationId = this.data.examinationId;
    }
    search(term) {
    }
    onModelChange(note) {
        return __awaiter(this, void 0, void 0, function* () {
            if (note > this.examination.subject.markBy) {
                this.utils.common.toast('La note est supérieure à la note maximale');
                return;
            }
            const x = yield this.repo.exams.update(this.examination, this.examination._id);
        });
    }
    sortMarks(m1, m2) {
        return m1.student.lastname.localeCompare(m2.student.lastname);
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isMarksCorrect() === true) {
                yield this.examinationsRepository.update(this.examination, this.examination._id);
                this.dialogRef.close();
            }
        });
    }
    isMarksCorrect() {
        const markBy = this.examination.subject.markBy || 20;
        for (const m of this.examination.marks) {
            if (m.mark > markBy) {
                this.utils.common.toast(`La note de ${m.student.firstname} ${m.student.lastname} est supérieure à la note maximale`);
                return false;
            }
        }
        return true;
    }
    ngOnInit() {
        this.repo.exams.one(this.examinationId)
            .then(examination => {
            this.examination = examination;
            this.examination.marks.sort(this.sortMarks);
            console.log(this.examination);
        })
            .catch(error => this.utils.common.toast(JSON.stringify(error)));
    }
};
MarksComponent = __decorate([
    Component({
        selector: 'app-marks',
        templateUrl: './marks.component.html',
        styleUrls: ['./marks.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], MarksComponent);
export { MarksComponent };
//# sourceMappingURL=marks.component.js.map