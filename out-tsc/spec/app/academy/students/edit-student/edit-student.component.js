import { __awaiter, __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
let EditStudentComponent = class EditStudentComponent {
    constructor(data, dialogRef, formBuilder, repo, utils) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.formBuilder = formBuilder;
        this.repo = repo;
        this.utils = utils;
        this.studentClassroom = new FormControl();
        this.isBusy = false;
        this.studentForm = this.formBuilder.group({
            _id: [''],
            firstname: [''],
            lastname: [''],
            birthday: [''],
            matricule: [''],
            gender: [''],
            status: [''],
            birthCity: [''],
            fathersFirstname: [''],
            fathersLastname: [''],
            mothersFirstname: [''],
            mothersLastname: [''],
            fathersJob: [''],
            mothersJob: [''],
            fathersPhone: [''],
            mothersPhone: [''],
            address: [''],
            lastClass: [''],
            lastSchool: ['']
        });
        this.studentId = this.data.studentId;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBusy = true;
            if (!this.studentForm.valid) {
                this.utils.form.invalidatedForm(this.studentForm);
                return;
            }
            const student = this.studentForm.value;
            try {
                yield this.repo.students.update(student, this.student._id);
                if (this.studentClassroom.value._id !== this.registration.classroom._id) {
                    this.registration.classroom = this.studentClassroom.value;
                    yield this.repo.registrations.update(this.registration, this.registration._id);
                }
                this.utils.common.toast(`L'élève ${student.lastname} a bien été modifié`);
                this.dialogRef.close();
            }
            catch (e) {
                console.error(e);
                this.utils.common.alert(JSON.stringify(e));
                this.isBusy = false;
            }
        });
    }
    getStudent() {
        return __awaiter(this, void 0, void 0, function* () {
            this.registration = yield this.repo.registrations.student(this.studentId);
            this.student = this.registration.student;
            this.studentForm.patchValue(this.student);
            this.studentClassroom.patchValue(this.registration.classroom);
        });
    }
    ngOnInit() {
        this.classrooms = this.repo.classrooms.stream;
        this.getStudent();
    }
};
EditStudentComponent = __decorate([
    Component({
        selector: 'app-edit-student',
        templateUrl: './edit-student.component.html',
        styleUrls: ['./edit-student.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], EditStudentComponent);
export { EditStudentComponent };
//# sourceMappingURL=edit-student.component.js.map