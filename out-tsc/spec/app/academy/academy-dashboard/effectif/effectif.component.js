import { __decorate } from "tslib";
import { Component } from '@angular/core';
let EffectifComponent = class EffectifComponent {
    constructor(services) {
        this.services = services;
        this.options = {
            plugins: {
                datalabels: {
                    color: '#ffffff'
                }
            },
        };
        this.labels = ['Garçon', 'Fille'];
        this.colors = [
            { backgroundColor: ['#396afc', '#f953c6'] }
        ];
    }
    ngOnInit() {
        this.data = this.services.statsStudent.schoolGenders;
    }
};
EffectifComponent = __decorate([
    Component({
        selector: 'app-effectif',
        templateUrl: './effectif.component.html',
        styleUrls: ['./effectif.component.scss']
    })
], EffectifComponent);
export { EffectifComponent };
//# sourceMappingURL=effectif.component.js.map