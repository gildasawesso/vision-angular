import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { AddOrEditTeacherComponent } from '../add-or-edit-teacher/add-or-edit-teacher.component';
import { constants } from '../../../core/constants';
let TeachersListComponent = class TeachersListComponent {
    constructor(utils, teachersRepository) {
        this.utils = utils;
        this.teachersRepository = teachersRepository;
        this.mapping = {
            'append firstname lastname': 'Nom',
            gender: 'Sexe',
            phone: 'Téléphone',
            qualifications: 'Qualifications',
            options: 'Options'
        };
        this.optionsPermissions = { edit: constants.permissions.editTeacher, delete: constants.permissions.deleteTeacher };
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(AddOrEditTeacherComponent, { teacher: null });
        });
    }
    edit(teacher) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(AddOrEditTeacherComponent, { teacher });
        });
    }
    delete(teacher) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.utils.common.customAlert('Vous êtes sur le point de supprimer ce professeur', 'Attention', ['Annuler', 'Continuer']);
            if (result === 0) {
                return;
            }
            yield this.teachersRepository.remove(teacher._id);
        });
    }
    ngOnInit() {
        this.teachersRepository.stream
            .subscribe((teachers) => {
            this.data = [...teachers];
        });
    }
};
TeachersListComponent = __decorate([
    Component({
        selector: 'app-teachers-list',
        templateUrl: './teachers-list.component.html',
        styleUrls: ['./teachers-list.component.scss']
    })
], TeachersListComponent);
export { TeachersListComponent };
//# sourceMappingURL=teachers-list.component.js.map