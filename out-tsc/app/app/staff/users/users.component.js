import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { AddOrEditUserComponent } from './add-or-edit-user/add-or-edit-user.component';
let UsersComponent = class UsersComponent {
    constructor(usersRepository, utils) {
        this.usersRepository = usersRepository;
        this.utils = utils;
        this.mapping = {
            'append firstname lastname': 'Nom',
            job: 'Fonction',
            'array roles name': 'Role',
            options: 'Options'
        };
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(AddOrEditUserComponent, { user: null });
        });
    }
    edit(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(AddOrEditUserComponent, { user });
        });
    }
    delete(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.utils.common.customAlert('Confirmez-vous la suppression de ce personnel ?', 'Attention', ['OUI', 'NON']);
            if (result === 0) {
                yield this.usersRepository.remove(user._id);
                yield this.utils.common.toast('Personnel supprimé avec succès');
            }
        });
    }
    ngOnInit() {
        this.usersRepository.stream
            .subscribe(users => this.data = [...users]);
    }
};
UsersComponent = __decorate([
    Component({
        selector: 'app-users',
        templateUrl: './users.component.html',
        styleUrls: ['./users.component.scss']
    })
], UsersComponent);
export { UsersComponent };
//# sourceMappingURL=users.component.js.map