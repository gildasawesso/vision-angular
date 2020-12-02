import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { AddOrEditRoleComponent } from './add-or-edit-role/add-or-edit-role.component';
let RolesComponent = class RolesComponent {
    constructor(utils, rolesRepository) {
        this.utils = utils;
        this.rolesRepository = rolesRepository;
        this.mapping = {
            name: 'Nom',
            'array permissions description |': 'Permissions',
            options: 'Options'
        };
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(AddOrEditRoleComponent, { role: null });
        });
    }
    edit(role) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(AddOrEditRoleComponent, { role });
        });
    }
    delete(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.utils.common.customAlert('Confirmez-vous la suppression de ce rôle ?', 'Attention', ['OUI', 'NON']);
            if (result === 0) {
                yield this.rolesRepository.remove(user._id);
                yield this.utils.common.toast('Rôle supprimé avec succès');
            }
        });
    }
    ngOnInit() {
        this.rolesRepository.stream
            .subscribe(roles => this.data = [...roles]);
    }
};
RolesComponent = __decorate([
    Component({
        selector: 'app-roles',
        templateUrl: './roles.component.html',
        styleUrls: ['./roles.component.scss']
    })
], RolesComponent);
export { RolesComponent };
//# sourceMappingURL=roles.component.js.map