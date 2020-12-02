import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let AddOrEditTrancheComponent = class AddOrEditTrancheComponent {
    constructor(data, formBuilder, dialogRef) {
        this.data = data;
        this.formBuilder = formBuilder;
        this.dialogRef = dialogRef;
        this.title = `Ajout d'une tranche`;
        this.buttonSubmitText = 'Créer une tranche';
        this.trancheForm = this.formBuilder.group({
            name: [''],
            amount: [''],
            dueDate: [''],
        });
        if (this.data) {
            this.title = `Modification d'une tranche`;
            this.buttonSubmitText = `Modifier la tranche`;
            this.trancheForm.patchValue(this.data);
        }
    }
    save() {
        this.dialogRef.close(this.trancheForm.value);
    }
    ngOnInit() {
    }
};
AddOrEditTrancheComponent = __decorate([
    Component({
        selector: 'app-add-or-edit-tranche',
        templateUrl: './add-or-edit-tranche.component.html',
        styleUrls: ['./add-or-edit-tranche.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], AddOrEditTrancheComponent);
export { AddOrEditTrancheComponent };
//# sourceMappingURL=add-or-edit-tranche.component.js.map