import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
let AddOrEditExaminationComponent = class AddOrEditExaminationComponent {
    constructor(examinationsRepository, classroomsRepository, examinationTypesRepository, dialogRef, schoolyearsRepository, services, repo, utils) {
        this.examinationsRepository = examinationsRepository;
        this.classroomsRepository = classroomsRepository;
        this.examinationTypesRepository = examinationTypesRepository;
        this.dialogRef = dialogRef;
        this.schoolyearsRepository = schoolyearsRepository;
        this.services = services;
        this.repo = repo;
        this.utils = utils;
        this.classroomFormControl = new FormControl('', Validators.required);
        this.subjectsFormControl = new FormControl('', Validators.required);
        this.examinationTypeFormControl = new FormControl('', Validators.required);
        this.examinationDateFormControl = new FormControl(moment().format());
    }
    handleOnClassroomSelected() {
        this.classroomFormControl.valueChanges
            .subscribe((classroom) => {
            this.classroomSubjects = classroom.subjects;
        });
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFormValid()) {
                try {
                    const examinationTypes = this.examinationTypeFormControl.value;
                    const subjects = this.subjectsFormControl.value;
                    examinationTypes.map(type => {
                        subjects.map((subject) => __awaiter(this, void 0, void 0, function* () {
                            const examination = {
                                classroomId: this.classroomFormControl.value._id,
                                subjectId: subject._id,
                                typeId: type._id,
                                examinationDate: this.examinationDateFormControl.value,
                                schoolYearId: this.services.schoolYear.snapshot._id,
                                schoolId: this.services.auth.currentUser.schools[0]
                            };
                            yield this.examinationsRepository.add(examination);
                        }));
                    });
                    this.utils.common.alert('Les axaminations ont été ajoutées avec succès', '');
                    this.dialogRef.close();
                }
                catch (e) {
                    console.error(e.error);
                    this.utils.common.alert(e.error.message);
                }
            }
            else {
                this.utils.common.toast('Formulaire non valide');
            }
        });
    }
    isFormValid() {
        return this.classroomFormControl.valid && this.subjectsFormControl.valid && this.examinationTypeFormControl.valid;
    }
    ngOnInit() {
        this.handleOnClassroomSelected();
    }
};
AddOrEditExaminationComponent = __decorate([
    Component({
        selector: 'app-add-or-edit-examination',
        templateUrl: './add-or-edit-examination.component.html',
        styleUrls: ['./add-or-edit-examination.component.scss']
    })
], AddOrEditExaminationComponent);
export { AddOrEditExaminationComponent };
//# sourceMappingURL=add-or-edit-examination.component.js.map