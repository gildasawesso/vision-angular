import { __awaiter, __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
let StudentChooserComponent = class StudentChooserComponent {
    constructor(repo, utils, dialogRef) {
        this.repo = repo;
        this.utils = utils;
        this.dialogRef = dialogRef;
        this.classroomSelected = new FormControl(null, Validators.required);
        this.studentSelected = new FormControl(null, Validators.required);
    }
    choose() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.utils.form.isValid(this.studentSelected) && this.utils.form.isValid(this.classroomSelected)) {
                this.dialogRef.close(this.studentSelected.value);
            }
        });
    }
    trackBy(index, item) {
        if (item == null) {
            console.log(index);
        }
        return item._id;
    }
    sortRegistrations(r1, r2) {
        if (r1.student.lastname > r2.student.lastname) {
            return 1;
        }
        else if (r1.student.lastname < r2.student.lastname) {
            return -1;
        }
        else {
            return 0;
        }
    }
    ngOnInit() {
        this.repo.registrations.stream.subscribe(registrations => this.registrations = registrations.sort(this.sortRegistrations));
        this.repo.classrooms.stream.subscribe(c => this.classrooms = c);
        this.classroomSelected.valueChanges.subscribe(classroom => {
            this.registrationsFiltered = this.registrations.filter(r => r.classroom._id === classroom._id);
        });
    }
};
__decorate([
    ViewChild('searchStudent', { static: true })
], StudentChooserComponent.prototype, "registrationSearch", void 0);
StudentChooserComponent = __decorate([
    Component({
        selector: 'app-student-chooser',
        templateUrl: './student-chooser.component.html',
        styleUrls: ['./student-chooser.component.scss']
    })
], StudentChooserComponent);
export { StudentChooserComponent };
//# sourceMappingURL=student-chooser.component.js.map