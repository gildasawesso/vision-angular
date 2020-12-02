import { __awaiter, __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { RegisterComponent } from './register/register.component';
let ReRegistrationComponent = class ReRegistrationComponent {
    constructor(studentsRepository, registrationsRepository, utils) {
        this.studentsRepository = studentsRepository;
        this.registrationsRepository = registrationsRepository;
        this.utils = utils;
        this.focused = false;
    }
    register(registration) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(RegisterComponent, registration);
            this.registrationsFiltered = [];
            this.registrationSearch.nativeElement.value = '';
        });
    }
    trackBy(index, item) {
        if (item == null) {
            console.log(index);
        }
        return item._id;
    }
    ngOnInit() {
        this.registrationsRepository.lastYearRegisrations.subscribe(registrations => {
            this.lastYearRegistrations = null;
            this.lastYearRegistrations = registrations;
        });
        this.registrationsRepository.stream
            .pipe(map(registrations => {
            return registrations.map(r => [r.student._id, r]);
        }), map((entries) => Object.fromEntries(entries)))
            .subscribe(r => {
            this.currentYearRegistrations = r;
        });
        fromEvent(this.registrationSearch.nativeElement, 'keyup')
            .pipe(map((event) => event.target.value), debounceTime(300), distinctUntilChanged())
            .subscribe(value => {
            if (!this.lastYearRegistrations) {
                return;
            }
            if (value === '') {
                this.registrationsFiltered = [];
                return;
            }
            this.registrationsFiltered = this.lastYearRegistrations.filter(regisration => {
                const fields = `${regisration.student.firstname}${regisration.student.lastname}${regisration.student.lastname}${regisration.student.firstname}`;
                return fields.trim().toLowerCase().indexOf(value.trim().toLowerCase()) >= 0;
            });
        });
    }
};
__decorate([
    ViewChild('searchStudent', { static: true })
], ReRegistrationComponent.prototype, "registrationSearch", void 0);
ReRegistrationComponent = __decorate([
    Component({
        selector: 'app-other-registration',
        templateUrl: './re-registration.component.html',
        styleUrls: ['./re-registration.component.scss']
    })
], ReRegistrationComponent);
export { ReRegistrationComponent };
//# sourceMappingURL=re-registration.component.js.map