import { __awaiter, __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { AddOrEditClassroomComponent } from './add-or-edit-classroom/add-or-edit-classroom.component';
let ClassroomsComponent = class ClassroomsComponent {
    constructor(classroomRepository, repo, utils) {
        this.classroomRepository = classroomRepository;
        this.repo = repo;
        this.utils = utils;
        this.columns = [];
    }
    add() {
        this.utils.common.modal(AddOrEditClassroomComponent, null);
    }
    edit(classroom) {
        this.utils.common.modal(AddOrEditClassroomComponent, classroom);
    }
    delete(classroom) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repo.classrooms.remove(classroom._id);
        });
    }
    ngOnInit() {
        this.classrooms = this.repo.classrooms.stream;
    }
    ngAfterViewInit() {
        this.columns = [
            { name: 'Nom', prop: 'name' },
            { name: `Frais d'inscription`, cellTemplate: this.registrationFeeTemplate },
            { name: `Frais de réinscription`, cellTemplate: this.reRegistrationFeeTemplate },
            { name: `Frais de sclarité`, cellTemplate: this.schoolFeeTemplate },
        ];
    }
};
__decorate([
    ViewChild('registrationFee', { static: true })
], ClassroomsComponent.prototype, "registrationFeeTemplate", void 0);
__decorate([
    ViewChild('reRegistrationFee', { static: true })
], ClassroomsComponent.prototype, "reRegistrationFeeTemplate", void 0);
__decorate([
    ViewChild('schoolFee', { static: true })
], ClassroomsComponent.prototype, "schoolFeeTemplate", void 0);
ClassroomsComponent = __decorate([
    Component({
        selector: 'app-classes-list',
        templateUrl: './classrooms.component.html',
        styleUrls: ['./classrooms.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], ClassroomsComponent);
export { ClassroomsComponent };
//# sourceMappingURL=classrooms.component.js.map