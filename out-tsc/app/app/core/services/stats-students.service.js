import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let StatsStudentsService = class StatsStudentsService {
    constructor(repo, api, schoolYearService) {
        this.repo = repo;
        this.api = api;
        this.schoolYearService = schoolYearService;
        this.genders$ = new BehaviorSubject([null, null]);
        this.effectifByClassroom$ = new BehaviorSubject([]);
        this.pastAndNewStudents$ = new BehaviorSubject([]);
        this.schoolYearService.schoolYear.subscribe(sy => this.schoolYear = sy);
        this.init();
    }
    get schoolGenders() { return this.genders$.asObservable(); }
    get effectifByClassroom() { return this.effectifByClassroom$.asObservable(); }
    get pastAndNewStudents() { return this.pastAndNewStudents$.asObservable(); }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.repo.registrations.stream.subscribe((_) => __awaiter(this, void 0, void 0, function* () {
                yield this.getSchoolGenders();
                yield this.getClassroomEffectif();
                yield this.getSchoolPastAndNewEffectif();
            }));
        });
    }
    getSchoolPastAndNewEffectif() {
        return __awaiter(this, void 0, void 0, function* () {
            const effectif = yield this.get(`/stats/pastandnewstudents`);
            this.pastAndNewStudents$.next(effectif);
        });
    }
    getSchoolGenders() {
        return __awaiter(this, void 0, void 0, function* () {
            const genderStats = yield this.get(`/stats/genders`);
            this.genders$.next([genderStats.boys, genderStats.girls]);
        });
    }
    getClassroomEffectif() {
        return __awaiter(this, void 0, void 0, function* () {
            const effectifs = yield this.get(`/stats/classrooms/effectif`);
            this.effectifByClassroom$.next(effectifs);
        });
    }
    get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.get(`${url}?schoolyear=${this.schoolYear._id}`).toPromise();
        });
    }
};
StatsStudentsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], StatsStudentsService);
export { StatsStudentsService };
//# sourceMappingURL=stats-students.service.js.map