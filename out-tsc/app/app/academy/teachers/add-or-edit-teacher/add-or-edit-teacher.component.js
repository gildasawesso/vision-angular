import { __awaiter, __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let AddOrEditTeacherComponent = class AddOrEditTeacherComponent {
    constructor(formBuilder, data, dialogRef, utils, teachersRepository) {
        this.formBuilder = formBuilder;
        this.data = data;
        this.dialogRef = dialogRef;
        this.utils = utils;
        this.teachersRepository = teachersRepository;
        this.teacherForm = this.formBuilder.group({
            firstname: [''],
            lastname: [''],
            gender: [''],
            address: [''],
            phone: [''],
            qualifications: [''],
            hireDate: [''],
            fireDate: ['']
        });
        this.title = `Ajout d'un nouvel enseignant`;
        this.submitText = `Ajouter l'enseignant`;
        this.teacher = this.data.teacher;
        if (this.teacher) {
            this.teacherForm.patchValue(this.teacher);
            this.title = 'Modification de l\'enseignant ' + this.teacher.lastname;
            this.submitText = 'Modifier l\'enseignant';
        }
    }
    save() {
        if (this.teacherForm.valid) {
            this.teacher ? this.update() : this.create();
            this.utils.common.toast(`Opération réalisée avec succès`);
            this.dialogRef.close();
        }
        else {
            this.utils.common.alert('Il existe des erreurs dans le formulaire');
        }
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.teachersRepository.add(this.teacherForm.value);
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.teachersRepository.update(this.teacherForm.value, this.teacher._id);
        });
    }
    ngOnInit() {
    }
};
AddOrEditTeacherComponent = __decorate([
    Component({
        selector: 'app-add-or-edit-teacher',
        templateUrl: './add-or-edit-teacher.component.html',
        styleUrls: ['./add-or-edit-teacher.component.scss']
    }),
    __param(1, Inject(MAT_DIALOG_DATA))
], AddOrEditTeacherComponent);
export { AddOrEditTeacherComponent };
//# sourceMappingURL=add-or-edit-teacher.component.js.map