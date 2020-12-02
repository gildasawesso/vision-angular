import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ViewChildren } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints } from '@angular/cdk/layout';
import { EffectifComponent } from './effectif/effectif.component';
import { ChartHostDirective } from '../../core/shared/directives/chart-host.directive';
import { EffectifPerClassroomComponent } from './effectif-per-classroom/effectif-per-classroom.component';
import { PastAndNewStudentsComponent } from './past-and-new-students/past-and-new-students.component';
let AcademyDashboardComponent = class AcademyDashboardComponent {
    constructor(breakpointObserver, registrationsRepository, classroomsRepository, subjectsRepository, teachersRepository, componentFactoryResolver, utils, changeDetector) {
        this.breakpointObserver = breakpointObserver;
        this.registrationsRepository = registrationsRepository;
        this.classroomsRepository = classroomsRepository;
        this.subjectsRepository = subjectsRepository;
        this.teachersRepository = teachersRepository;
        this.componentFactoryResolver = componentFactoryResolver;
        this.utils = utils;
        this.changeDetector = changeDetector;
        this.pkiTileHeigth = 130;
        this.pkiCards = [];
        this.registrations = [];
        this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(({ matches }) => {
            if (matches) {
                return [
                    { title: 'Card 1', cols: 1, rows: 1 },
                    { title: 'Card 2', cols: 1, rows: 1 },
                    { title: 'Card 3', cols: 1, rows: 1 },
                    { title: 'Card 4', cols: 1, rows: 1 }
                ];
            }
            return [
                { title: 'Effectif par sexe', cols: 2, rows: 1, component: EffectifComponent },
                { title: 'Anciens et nouveaux inscrits', cols: 2, rows: 1, component: PastAndNewStudentsComponent },
                { title: 'Effectif par classe', cols: 4, rows: 1, component: EffectifPerClassroomComponent },
            ];
        }));
    }
    component(viewContainer) {
        const component = EffectifComponent;
        const factory = this.componentFactoryResolver.resolveComponentFactory(component);
        viewContainer.createComponent(factory);
    }
    ngOnInit() {
        this.pkiCards = [
            { title: 'Élèves', cols: 1, rows: 1, value: this.registrationsRepository.stream, color: 'linear-gradient(to right, #f953c6, #b91d73)' },
            { title: 'Classes', cols: 1, rows: 1, value: this.classroomsRepository.stream, color: 'linear-gradient(90deg, rgb(54, 181, 183) 0%,rgb(19, 126, 105) 100%)' },
            { title: 'Cours', cols: 1, rows: 1, value: this.subjectsRepository.stream, color: 'linear-gradient(to right, #396afc, #2948ff)' },
            { title: 'Professeurs', cols: 1, rows: 1, value: this.teachersRepository.stream, color: 'linear-gradient(to right, #da22ff, #9733ee)' }
        ];
    }
    ngAfterViewInit() {
        this.chartHosts.map(chart => {
            this.utils.common.renderComponent(chart.viewContainer, chart.component);
        });
        this.changeDetector.detectChanges();
    }
};
__decorate([
    ViewChildren(ChartHostDirective)
], AcademyDashboardComponent.prototype, "chartHosts", void 0);
AcademyDashboardComponent = __decorate([
    Component({
        selector: 'app-academy-dashboard',
        templateUrl: './academy-dashboard.component.html',
        styleUrls: ['./academy-dashboard.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], AcademyDashboardComponent);
export { AcademyDashboardComponent };
//# sourceMappingURL=academy-dashboard.component.js.map