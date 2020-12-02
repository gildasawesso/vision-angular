import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { AddOrEditSchoolYearComponent } from './add-or-edit-school-year/add-or-edit-school-year.component';
let SchoolYearsComponent = class SchoolYearsComponent {
    constructor(schoolyearsRepository, utils) {
        this.schoolyearsRepository = schoolyearsRepository;
        this.utils = utils;
        this.columns = [];
        this.showOptions = false;
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.utils.common.modal(AddOrEditSchoolYearComponent, null);
            console.log(data);
        });
    }
    edit(schoolYear) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(AddOrEditSchoolYearComponent, schoolYear);
        });
    }
    remove(schoolYear) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.schoolyearsRepository.remove(schoolYear._id);
        });
    }
    ngOnInit() {
        this.schoolYears = this.schoolyearsRepository.stream;
        this.columns = [
            { prop: 'startDate', name: `Début`, pipe: { transform: this.utils.common.formatDate } },
            { prop: 'endDate', name: `Fin`, pipe: { transform: this.utils.common.formatDate } },
        ];
    }
};
SchoolYearsComponent = __decorate([
    Component({
        selector: 'app-school-years',
        templateUrl: './school-years.component.html',
        styleUrls: ['./school-years.component.scss']
    })
], SchoolYearsComponent);
export { SchoolYearsComponent };
//# sourceMappingURL=school-years.component.js.map