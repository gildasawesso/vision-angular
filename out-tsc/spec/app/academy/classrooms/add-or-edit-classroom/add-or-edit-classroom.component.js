import { __awaiter, __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let AddOrEditClassroomComponent = class AddOrEditClassroomComponent {
    constructor(data, dialogRef, formBuilder, subjectsRepository, feesRepository, classroomsRepository, utils, teachersRepository) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.formBuilder = formBuilder;
        this.subjectsRepository = subjectsRepository;
        this.feesRepository = feesRepository;
        this.classroomsRepository = classroomsRepository;
        this.utils = utils;
        this.teachersRepository = teachersRepository;
        this.classroomForm = this.formBuilder.group({
            name: [''],
            code: [''],
            capacity: [''],
            teacher: [null],
            registrationFee: [null],
            reregistrationFee: [null],
            schoolFee: [null],
            subjects: [null]
        });
        this.title = `Ajout d'une nouvelle classe`;
        this.submitText = `Créer la classe`;
        this.isNewClassroom = true;
        if (this.data) {
            this.isNewClassroom = false;
            this.classroom = this.data;
            this.title = `Modification de la classe de ${this.classroom.name}`;
            this.submitText = `Modifier la classe`;
            this.classroomForm.patchValue(this.classroom);
        }
    }
    save() {
        if (this.classroomForm.valid) {
            this.isNewClassroom ? this.createClassroom() : this.updateClassroom();
            this.utils.common.toast(`Opération réalisée avec succès`);
            this.dialogRef.close();
        }
        else {
            this.utils.common.alert('Il existe des erreurs dans le formulaire');
        }
    }
    createClassroom() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.classroomsRepository.add(this.classroomForm.value);
        });
    }
    updateClassroom() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.classroomsRepository.update(this.classroomForm.value, this.classroom._id);
        });
    }
    ngOnInit() {
    }
};
AddOrEditClassroomComponent = __decorate([
    Component({
        selector: 'app-add-or-edit-classroom',
        templateUrl: './add-or-edit-classroom.component.html',
        styleUrls: ['./add-or-edit-classroom.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], AddOrEditClassroomComponent);
export { AddOrEditClassroomComponent };
//# sourceMappingURL=add-or-edit-classroom.component.js.map