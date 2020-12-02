/**
 * Created by gildas on 4/15/2018.
 */
import { __awaiter } from "tslib";
import { BehaviorSubject } from 'rxjs';
import { inject } from '@angular/core';
import { BaseDatasource } from '../datasources/base.datasource';
import { MatDialog } from '@angular/material/dialog';
import { CustomizableAlertDialogComponent } from '../shared/components/customizable-alert-dialog/customizable-alert-dialog.component';
import { filter, first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
export class BaseRepository extends BaseDatasource {
    constructor(basePath) {
        super(basePath);
        this.basePath = basePath;
        this.genericBehaviorSubject = new BehaviorSubject(null);
        this.objects = this.genericBehaviorSubject.asObservable();
        this.dialog = inject(MatDialog);
        this.auth = inject(AuthService);
        this.init();
    }
    load(schoolYear) {
        return __awaiter(this, void 0, void 0, function* () {
            this.next = yield this.list(schoolYear);
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.schoolYearService.schoolYear.subscribe((schoolYear) => __awaiter(this, void 0, void 0, function* () {
                if (schoolYear == null) {
                    this.genericBehaviorSubject.next(null);
                    return;
                }
                this.next = yield this.list(schoolYear);
            }));
        });
    }
    get snapshot() {
        return this.genericBehaviorSubject.value;
    }
    get stream() {
        return this.objects.pipe(filter(objects => objects != null));
    }
    sync() {
        this.schoolYearService.schoolYear.pipe(first()).subscribe((schoolYear) => __awaiter(this, void 0, void 0, function* () {
            if (schoolYear) {
                this.next = yield this.list(schoolYear);
            }
        }));
    }
    localRefresh() {
        this.genericBehaviorSubject.next(this.snapshot);
    }
    set next(object) {
        this.genericBehaviorSubject.next(object);
    }
    one(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getOne(id);
        });
    }
    add(object) {
        return __awaiter(this, void 0, void 0, function* () {
            const newObject = yield this.post(object);
            this.genericBehaviorSubject.next([newObject, ...this.genericBehaviorSubject.value]);
            return newObject;
        });
    }
    update(object, id, idKey = '_id') {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedObject = yield this.patch(object, id);
            const objects = this.genericBehaviorSubject.value;
            const index = objects.findIndex(o => o[idKey] === updatedObject[idKey]);
            objects[index] = updatedObject;
            this.genericBehaviorSubject.next(objects);
            return updatedObject;
        });
    }
    remove(id, key = '_id') {
        return __awaiter(this, void 0, void 0, function* () {
            const dialog = this.dialog.open(CustomizableAlertDialogComponent, {
                data: {
                    title: `Attention`,
                    body: `Veuillez confirmer afin de procéder à la suppression`,
                    actions: [`ANNULER`, `SUPPRIMER`]
                }
            });
            const res = yield dialog.afterClosed().toPromise();
            if (res === 1) {
                yield this.delete(id);
                const objects = this.genericBehaviorSubject.value;
                const index = objects.findIndex(o => o[key] === id);
                objects.splice(index, 1);
                this.genericBehaviorSubject.next(objects);
            }
        });
    }
}
// combineLatest([this.genericBehaviorSubject.asObservable(), this.schoolYearService.schoolYear])
//   .subscribe(([objects, schoolYear]: [T[], SchoolYear]) => {
//     if (schoolYear != null) {
//       this.load(schoolYear);
//     }
//   });
//# sourceMappingURL=base.repository.js.map