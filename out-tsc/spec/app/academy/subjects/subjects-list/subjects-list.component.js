import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { AddOrEditSubjectComponent } from '../add-or-edit-subject/add-or-edit-subject.component';
import { constants } from '../../../core/constants';
let SubjectsListComponent = class SubjectsListComponent {
    constructor(utils, subjectsRepository) {
        this.utils = utils;
        this.subjectsRepository = subjectsRepository;
        this.mapping = {
            name: 'Nom',
            code: 'Code de la matière',
            'array teachers lastname': 'Enseignants',
            options: 'Options'
        };
        this.optionsPermissions = { edit: constants.permissions.editSubject, delete: constants.permissions.deleteSubject };
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(AddOrEditSubjectComponent, { subject: null });
        });
    }
    edit(subject) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(AddOrEditSubjectComponent, { subject });
        });
    }
    delete(subject) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.utils.common.customAlert('Vous êtes sur le point de supprimer un cours', 'Attention', ['Annuler', 'Continuer']);
            if (result === 0) {
                return;
            }
            yield this.subjectsRepository.remove(subject._id);
        });
    }
    ngOnInit() {
        this.subjectsRepository.stream
            .subscribe((subjects) => {
            this.data = [...subjects];
        });
    }
};
SubjectsListComponent = __decorate([
    Component({
        selector: 'app-courses-list',
        templateUrl: './subjects-list.component.html',
        styleUrls: ['./subjects-list.component.scss']
    })
], SubjectsListComponent);
export { SubjectsListComponent };
//# sourceMappingURL=subjects-list.component.js.map