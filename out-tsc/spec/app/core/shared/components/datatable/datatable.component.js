import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
let DatatableComponent = class DatatableComponent {
    constructor() {
        this.hideOptions = false;
        this.hideEdit = false;
        this.hideDelete = false;
        this.count = 0;
        this.edit = new EventEmitter();
        this.remove = new EventEmitter();
        this.sortType = SortType;
        this.columnMode = ColumnMode;
    }
    onEdit(item) {
        this.edit.emit(item);
    }
    onRemove(item) {
        this.remove.emit(item);
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
        if (changes[`columns`]) {
            if (!this.hideOptions) {
                if (this.columns.find(c => c[`name`] === 'Options') === undefined) {
                    this.columns.push({ name: 'Options', cellTemplate: this.optionsTemplate });
                }
            }
        }
    }
};
__decorate([
    Input()
], DatatableComponent.prototype, "rows", void 0);
__decorate([
    Input()
], DatatableComponent.prototype, "columns", void 0);
__decorate([
    Input()
], DatatableComponent.prototype, "loading", void 0);
__decorate([
    Input()
], DatatableComponent.prototype, "hideOptions", void 0);
__decorate([
    Input()
], DatatableComponent.prototype, "hideEdit", void 0);
__decorate([
    Input()
], DatatableComponent.prototype, "hideDelete", void 0);
__decorate([
    Input()
], DatatableComponent.prototype, "count", void 0);
__decorate([
    Output()
], DatatableComponent.prototype, "edit", void 0);
__decorate([
    Output()
], DatatableComponent.prototype, "remove", void 0);
__decorate([
    ViewChild('actionsTemplate', { static: true })
], DatatableComponent.prototype, "optionsTemplate", void 0);
DatatableComponent = __decorate([
    Component({
        selector: 'app-datatable',
        templateUrl: './datatable.component.html',
        styleUrls: ['./datatable.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], DatatableComponent);
export { DatatableComponent };
//# sourceMappingURL=datatable.component.js.map