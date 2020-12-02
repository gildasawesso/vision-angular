import { __awaiter, __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let AddOrEditSubjectComponent = class AddOrEditSubjectComponent {
    constructor(formBuilder, data, dialogRef, utils, subjectsRepository, teachersRepository) {
        this.formBuilder = formBuilder;
        this.data = data;
        this.dialogRef = dialogRef;
        this.utils = utils;
        this.subjectsRepository = subjectsRepository;
        this.teachersRepository = teachersRepository;
        this.subjectForm = this.formBuilder.group({
            _id: null,
            name: [''],
            code: [''],
            teachers: [],
            markBy: [20],
            coefficient: [1]
        });
        this.title = `Ajout d'un nouveau cours`;
        this.submitText = `Ajout le cours`;
        this.markByList = [10, 20];
        this.subject = this.data.subject;
        if (this.subject) {
            this.subjectForm.patchValue(this.subject);
            this.submitText = 'Modifier le cours';
            this.title = 'Modification du cours de' + this.subject.name;
        }
    }
    save() {
        if (this.subjectForm.valid) {
            this.subject ? this.update() : this.create();
            this.utils.common.toast(`Opération réalisée avec succès`);
            this.dialogRef.close();
        }
        else {
            this.utils.common.alert('Il existe des erreurs dans le formulaire');
        }
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.subjectsRepository.add(this.subjectForm.value);
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.subjectsRepository.update(this.subjectForm.value, this.subject._id);
        });
    }
    ngOnInit() {
    }
};
AddOrEditSubjectComponent = __decorate([
    Component({
        selector: 'app-add-or-edit-subject',
        templateUrl: './add-or-edit-subject.component.html',
        styleUrls: ['./add-or-edit-subject.component.scss']
    }),
    __param(1, Inject(MAT_DIALOG_DATA))
], AddOrEditSubjectComponent);
export { AddOrEditSubjectComponent };
//# sourceMappingURL=add-or-edit-subject.component.js.map