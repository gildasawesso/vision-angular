import { __awaiter, __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
let StudentsComponent = class StudentsComponent {
    constructor(studentsRepository, classroomsRepository, registrationsRepository, repo, changeDetector, utils) {
        this.studentsRepository = studentsRepository;
        this.classroomsRepository = classroomsRepository;
        this.registrationsRepository = registrationsRepository;
        this.repo = repo;
        this.changeDetector = changeDetector;
        this.utils = utils;
        this.filteredStudents = [];
        this.columns = [];
        this.classroomSelected = new FormControl(null);
        this.searchTerm = new FormControl('');
    }
    filter() {
        if (this.classroomSelected.value == null) {
            this.filteredStudents = [...this.students].sort(this.utils.student.sortFn);
        }
        else {
            this.filteredStudents = this.students.filter(student => student.classroomId === this.classroomSelected.value).sort(this.utils.student.sortFn);
        }
        this.changeDetector.detectChanges();
    }
    search() {
        const value = this.searchTerm.value;
        this.filter();
        this.filteredStudents = this.filteredStudents.filter(student => `${student.lastname}${student.firstname}`.toLowerCase().indexOf(value === null || value === void 0 ? void 0 : value.toLowerCase()) >= 0);
        this.changeDetector.detectChanges();
    }
    edit(student) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.common.modal(EditStudentComponent, { studentId: student._id }, true);
            this.registrationsRepository.sync();
        });
    }
    delete(student) {
        return __awaiter(this, void 0, void 0, function* () {
            const registration = yield this.repo.registrations.student(student._id);
            yield this.repo.registrations.remove(registration._id);
            this.repo.students.sync();
            this.changeDetector.detectChanges();
        });
    }
    ngOnInit() {
        this.repo.students.stream.subscribe(students => {
            this.students = [...students];
            this.filteredStudents = [...students].sort(this.utils.student.sortFn);
            this.changeDetector.detectChanges();
        });
        this.repo.classrooms.stream.subscribe(classrooms => {
            this.classrooms = classrooms;
            this.changeDetector.detectChanges();
        });
        this.classroomSelected.valueChanges.subscribe(classroom => {
            if (classroom === null) {
                this.filteredStudents = [...this.students].sort(this.utils.student.sortFn);
            }
            else {
                this.filter();
            }
        });
    }
    ngAfterViewInit() {
        this.columns = [
            { name: 'Nom', cellTemplate: this.studentFullNameTemplate },
            { name: 'Matricule', prop: 'matricule' },
            { name: 'Sexe', prop: 'gender' },
        ];
        fromEvent(this.searchTemplate.nativeElement, 'keyup').pipe(map((event) => event.target.value), debounceTime(400), distinctUntilChanged()).subscribe(value => {
            if (value === '') {
                this.filter();
            }
            else {
                this.search();
            }
        });
    }
};
__decorate([
    ViewChild('studentFullName', { static: true })
], StudentsComponent.prototype, "studentFullNameTemplate", void 0);
__decorate([
    ViewChild('searchInput', { static: true })
], StudentsComponent.prototype, "searchTemplate", void 0);
StudentsComponent = __decorate([
    Component({
        selector: 'app-students-list',
        templateUrl: './students.component.html',
        styleUrls: ['./students.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], StudentsComponent);
export { StudentsComponent };
//# sourceMappingURL=students.component.js.map