import { __awaiter, __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let AddOrEditUserComponent = class AddOrEditUserComponent {
    constructor(formBuilder, data, dialogRef, utils, usersRepository, rolesRepository, schoolsRepository) {
        this.formBuilder = formBuilder;
        this.data = data;
        this.dialogRef = dialogRef;
        this.utils = utils;
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
        this.schoolsRepository = schoolsRepository;
        this.title = 'Ajout d\'un personnel';
        this.submitText = 'Ajouter';
        this.userForm = this.formBuilder.group({
            username: [''],
            firstname: [''],
            lastname: [''],
            gender: ['M'],
            job: [''],
            password: [''],
            schools: [],
            roles: [],
            isAdmin: [false],
        });
        if (data.user) {
            this.userForm.patchValue(data.user);
            this.user = data.user;
            this.title = 'Modification d\'un personnel';
            this.submitText = 'Modifier';
        }
    }
    save() {
        if (this.utils.form.isValid(this.userForm)) {
            this.user == null ? this.create() : this.update();
        }
        else {
            this.utils.common.toast('Il existe des erreurs dans le formulaire');
        }
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.userForm.value;
            user.schools = this.schoolsRepository.list[0];
            yield this.usersRepository.add(user);
            this.utils.common.toast('Personnel ajouté avec succès');
            this.close();
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.userForm.value;
            user._id = this.user._id;
            yield this.usersRepository.update(user, this.user._id);
            this.utils.common.toast('Personnel modifié avec succès');
            this.close();
        });
    }
    close() {
        this.dialogRef.close();
    }
    ngOnInit() {
    }
};
AddOrEditUserComponent = __decorate([
    Component({
        selector: 'app-add-user',
        templateUrl: './add-or-edit-user.component.html',
        styleUrls: ['./add-or-edit-user.component.scss']
    }),
    __param(1, Inject(MAT_DIALOG_DATA))
], AddOrEditUserComponent);
export { AddOrEditUserComponent };
//# sourceMappingURL=add-or-edit-user.component.js.map