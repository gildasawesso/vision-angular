import { __awaiter, __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { AddOrEditExaminationComponent } from '../add-or-edit-examination/add-or-edit-examination.component';
import { MarksComponent } from '../marks/marks.component';
import { constants } from '../../../core/constants';
import { FormControl } from '@angular/forms';
import { SortType } from '@swimlane/ngx-datatable';
let ExaminationsListComponent = class ExaminationsListComponent {
    constructor(examinationsRepository, examinationTypesRepository, classroomsRepository, schoolyearsRepository, repo, utils) {
        this.examinationsRepository = examinationsRepository;
        this.examinationTypesRepository = examinationTypesRepository;
        this.classroomsRepository = classroomsRepository;
        this.schoolyearsRepository = schoolyearsRepository;
        this.repo = repo;
        this.utils = utils;
        this.constants = constants;
        this.tableIsLoading = true;
        this.sortType = SortType;
        this.examinationTypes = [];
        this.examinations = [];
        this.classrooms = [];
        this.subjects = [];
        this.rows = [];
        this.columns = [];
        this.mapping = {
            'date createdAt': 'Date de l\'examen',
            'subject.code': 'Matière',
            'type.name': 'Type d\'examination',
            notes: 'Notes',
            options: 'Options',
        };
        this.classroomSelected = new FormControl(null);
        this.subjectSelected = new FormControl(null);
        this.examinationTypeSelected = new FormControl(null);
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(AddOrEditExaminationComponent, { examination: null });
        });
    }
    edit(examination) {
    }
    delete(examination) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.utils.common.customAlert('L\'examination sera supprimée définitivement', 'Attention', ['Annuler', 'Je comprends']);
            if (res) {
                yield this.examinationsRepository.remove(examination._id);
            }
        });
    }
    openNotesPage(examination) {
        this.utils.common.modal(MarksComponent, { examinationId: examination._id }, true);
    }
    isClassroomHasSubjects(classroom) {
        return classroom != null && classroom.subjects != null && classroom.subjects.length > 0;
    }
    loadExaminations() {
        let examinations = [...this.examinations];
        if (this.classroomSelected.value != null) {
            examinations = examinations.filter(e => this.classroomSelected.value._id === e.classroom._id);
        }
        if (this.subjectSelected.value != null) {
            examinations = examinations.filter(e => this.subjectSelected.value._id === e.subject._id);
        }
        if (this.examinationTypeSelected.value != null) {
            examinations = examinations.filter(e => this.examinationTypeSelected.value._id === e.type._id);
        }
        this.rows = examinations;
        this.tableIsLoading = false;
    }
    ngOnInit() {
        this.repo.exams.stream.subscribe(examinations => {
            this.examinations = examinations;
            this.loadExaminations();
        });
        this.examinationTypesRepository.stream.subscribe(examinationTypes => this.examinationTypes = examinationTypes);
        this.classroomsRepository.stream.subscribe(classrooms => this.classrooms = classrooms);
        this.classroomSelected.valueChanges.subscribe((classroom) => {
            if (classroom != null)
                this.subjects = classroom.subjects;
            this.loadExaminations();
        });
        this.subjectSelected.valueChanges.subscribe(_ => this.loadExaminations());
        this.examinationTypeSelected.valueChanges.subscribe(_ => this.loadExaminations());
        this.columns = [
            { prop: 'examinationDate', name: 'Date d\'examen', pipe: { transform: this.utils.common.formatDate } },
            { name: 'Matière', cellTemplate: this.subjectTemplate },
            { name: 'Classe', cellTemplate: this.classroomTemplate },
            { name: 'Type d\'examen', cellTemplate: this.examinationTypeTemplate },
            { name: 'Note', cellTemplate: this.noteTemplate },
            { name: 'Options', cellTemplate: this.actionsTemplate }
        ];
    }
};
__decorate([
    ViewChild('subjectTemplate', { static: true })
], ExaminationsListComponent.prototype, "subjectTemplate", void 0);
__decorate([
    ViewChild('classroomTemplate', { static: true })
], ExaminationsListComponent.prototype, "classroomTemplate", void 0);
__decorate([
    ViewChild('examinationTypeTemplate', { static: true })
], ExaminationsListComponent.prototype, "examinationTypeTemplate", void 0);
__decorate([
    ViewChild('noteTemplate', { static: true })
], ExaminationsListComponent.prototype, "noteTemplate", void 0);
__decorate([
    ViewChild('actionsTemplate', { static: true })
], ExaminationsListComponent.prototype, "actionsTemplate", void 0);
ExaminationsListComponent = __decorate([
    Component({
        selector: 'app-examinations-list',
        templateUrl: './examinations-list.component.html',
        styleUrls: ['./examinations-list.component.scss']
    })
], ExaminationsListComponent);
export { ExaminationsListComponent };
//# sourceMappingURL=examinations-list.component.js.map