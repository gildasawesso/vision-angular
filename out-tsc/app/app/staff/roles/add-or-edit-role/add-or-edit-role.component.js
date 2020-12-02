import { __awaiter, __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let AddOrEditRoleComponent = class AddOrEditRoleComponent {
    constructor(permissionsService, formBuilder, data, dialogRef, rolesRepository, utils) {
        this.permissionsService = permissionsService;
        this.formBuilder = formBuilder;
        this.data = data;
        this.dialogRef = dialogRef;
        this.rolesRepository = rolesRepository;
        this.utils = utils;
        this.rolesForm = this.formBuilder.group({
            name: [''],
            permissions: ['']
        });
        this.title = 'Ajouter un rôle';
        this.submitText = 'Ajouter';
        if (data.role) {
            this.rolesForm.patchValue(data.role);
            this.role = data.role;
            this.title = 'Modification du rôle';
            this.submitText = 'Modifier';
        }
    }
    userPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            this.permissions = yield this.permissionsService.allPermissions;
        });
    }
    save() {
        if (this.utils.form.isValid(this.rolesForm)) {
            this.role == null ? this.create() : this.update();
        }
        else {
            this.utils.common.toast('Il existe des erreurs dans le formulaire');
        }
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.rolesForm.value;
            yield this.rolesRepository.add(user);
            this.utils.common.toast('Rôle ajouté avec succès');
            this.close();
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const role = this.rolesForm.value;
            role._id = this.role._id;
            yield this.rolesRepository.update(role, this.role._id);
            this.utils.common.toast('Rôle modifié avec succès');
            this.close();
        });
    }
    close() {
        this.dialogRef.close();
    }
    ngOnInit() {
        this.userPermissions();
    }
};
AddOrEditRoleComponent = __decorate([
    Component({
        selector: 'app-add-or-edit-role',
        templateUrl: './add-or-edit-role.component.html',
        styleUrls: ['./add-or-edit-role.component.scss']
    }),
    __param(2, Inject(MAT_DIALOG_DATA))
], AddOrEditRoleComponent);
export { AddOrEditRoleComponent };
//# sourceMappingURL=add-or-edit-role.component.js.map