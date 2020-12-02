import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PastAndNewStudentsComponent = class PastAndNewStudentsComponent {
    constructor(services) {
        this.services = services;
        this.labels = ['Anciens élèves', 'Nouveaux élèves'];
        this.colors = [
            { backgroundColor: ['#ee3b55', '#0bc182'] }
        ];
        this.options = {
            plugins: {
                datalabels: {
                    color: '#ffffff'
                }
            },
        };
    }
    ngOnInit() {
        this.data = this.services.statsStudent.pastAndNewStudents;
    }
};
PastAndNewStudentsComponent = __decorate([
    Component({
        selector: 'app-past-and-new-students',
        templateUrl: './past-and-new-students.component.html',
        styleUrls: ['./past-and-new-students.component.scss']
    })
], PastAndNewStudentsComponent);
export { PastAndNewStudentsComponent };
//# sourceMappingURL=past-and-new-students.component.js.map