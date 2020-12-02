import { __awaiter } from "tslib";
import { ApiService } from '../services/api.service';
import { inject } from '@angular/core';
import { SchoolYearService } from '../services/school-year.service';
export class BaseDatasource {
    constructor(url) {
        this.url = url;
        this.api = inject(ApiService);
        this.schoolYearService = inject(SchoolYearService);
        this.schoolYearService.schoolYear.subscribe(sy => this.schoolYear = sy);
    }
    get query() {
        return {
            get: (path, queryParams) => {
                const params = queryParams ? `&${queryParams}` : '';
                return this.api.get(`${this.url}${path}?schoolyear=${this.schoolYear._id}${params}`).toPromise();
            },
            post: (path, data, queryParams) => {
                const params = queryParams ? `&${queryParams}` : '';
                return this.api.post(`${this.url}${path}?schoolyear=${this.schoolYear._id}${params}`, data).toPromise();
            }
        };
    }
    list(schoolYear) {
        return __awaiter(this, void 0, void 0, function* () {
            if (schoolYear) {
                return this.api.get(`${this.url}?schoolyear=${schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear._id}`).toPromise();
            }
            return this.api.get(`${this.url}`).toPromise();
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.get(`${this.url}/${id}?schoolyear=${this.schoolYear._id}`).toPromise();
        });
    }
    post(object) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.post(`${this.url}/?schoolyear=${this.schoolYear._id}`, object).toPromise();
        });
    }
    patch(object, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.patch(`${this.url}/${id}?schoolyear=${this.schoolYear._id}`, object).toPromise();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.delete(`${this.url}/${id}?schoolyear=${this.schoolYear._id}`).toPromise();
        });
    }
}
//# sourceMappingURL=base.datasource.js.map