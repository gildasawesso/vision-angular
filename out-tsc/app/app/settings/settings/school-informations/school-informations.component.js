import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let SchoolInformationsComponent = class SchoolInformationsComponent {
    constructor(formBuilder, utils, schoolsRepository, repo, router, auth) {
        this.formBuilder = formBuilder;
        this.utils = utils;
        this.schoolsRepository = schoolsRepository;
        this.repo = repo;
        this.router = router;
        this.auth = auth;
        this.schoolForm = this.formBuilder.group({
            _id: [''],
            name: ['', Validators.required],
            zipCode: [''],
            phones: [''],
            mobile: [''],
            address: ['', Validators.required],
            phone: [''],
            email: [''],
            subName: ['']
        });
        this.isBusy = false;
        this.isEdited = false;
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isBusy = true;
            if (this.utils.form.isValid(this.schoolForm)) {
                try {
                    const data = this.schoolForm.value;
                    const school = yield this.schoolsRepository.update(data, data._id);
                    this.schoolForm.patchValue(school);
                    this.isBusy = false;
                    this.isEdited = false;
                    this.utils.common.toast('les informations de l\'école ont été enrégistrées avec succès');
                }
                catch (e) {
                    this.utils.common.alert(e.error && e.error.message ? e.error.message : e.message, 'Erreur');
                    this.isEdited = false;
                    this.isBusy = false;
                }
            }
            this.isBusy = false;
        });
    }
    ngOnInit() {
        this.schoolForm.valueChanges
            .subscribe(_ => {
            this.isEdited = true;
        });
        this.repo.schools.stream.subscribe(school => {
            this.schoolForm.patchValue(school);
            this.isEdited = false;
        });
    }
};
SchoolInformationsComponent = __decorate([
    Component({
        selector: 'app-school-informations',
        templateUrl: './school-informations.component.html',
        styleUrls: ['./school-informations.component.scss']
    })
], SchoolInformationsComponent);
export { SchoolInformationsComponent };
//# sourceMappingURL=school-informations.component.js.map