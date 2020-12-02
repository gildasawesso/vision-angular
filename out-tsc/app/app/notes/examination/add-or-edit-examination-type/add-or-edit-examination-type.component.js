import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
let AddOrEditExaminationTypeComponent = class AddOrEditExaminationTypeComponent {
    constructor(data, dialogRef) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.type = new FormControl('', [Validators.required, Validators.minLength(2)]);
        this.group = new FormControl('', [Validators.required]);
        this.displayOrder = new FormControl('', [Validators.required]);
        this.btnMessage = 'Ajouter le type d\'examination';
        this.array = Array.from(Array(10).keys());
        if (this.data.type) {
            this.type.patchValue(this.data.type.name);
            this.group.patchValue(this.data.type.group ? this.data.type.group : 1, { emitEvent: true });
            this.displayOrder.patchValue(this.data.type.displayOrder ? this.data.type.displayOrder : 1, { emitEvent: true });
            this.btnMessage = 'Modifier le type d\'examination';
        }
    }
    add() {
        this.dialogRef.close({ name: this.type.value, group: this.group.value, displayOrder: this.displayOrder.value });
    }
    close() {
        this.dialogRef.close(null);
    }
    ngOnInit() {
    }
};
AddOrEditExaminationTypeComponent = __decorate([
    Component({
        selector: 'app-add-or-edit-examination-type',
        templateUrl: './add-or-edit-examination-type.component.html',
        styleUrls: ['./add-or-edit-examination-type.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], AddOrEditExaminationTypeComponent);
export { AddOrEditExaminationTypeComponent };
//# sourceMappingURL=add-or-edit-examination-type.component.js.map