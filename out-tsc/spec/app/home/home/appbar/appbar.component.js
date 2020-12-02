import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { homeMenu } from '../../home-menu';
import { Breakpoints } from '@angular/cdk/layout';
let AppbarComponent = class AppbarComponent {
    constructor(appbarService, breakpointObserver, schoolYearService, schoolyearsRepository, auth) {
        this.appbarService = appbarService;
        this.breakpointObserver = breakpointObserver;
        this.schoolYearService = schoolYearService;
        this.schoolyearsRepository = schoolyearsRepository;
        this.auth = auth;
        this.isHomeMenu = false;
        this.phone = this.breakpointObserver.observe([
            Breakpoints.Handset,
        ]);
        this.tablet = this.breakpointObserver.observe([
            Breakpoints.Tablet,
        ]);
        this.web = this.breakpointObserver.observe([
            Breakpoints.Tablet,
        ]);
    }
    signout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.auth.signout();
        });
    }
    onSchoolYearChange(schoolYear) {
        this.schoolYearService.schoolYear = schoolYear;
    }
    compareFn(c1, c2) {
        return c1 && c2 ? c1._id === c2._id : c1 === c2;
    }
    compareTermFn(c1, c2) {
        return c1 && c2 ? c1.name === c2.name : c1 === c2;
    }
    ngOnInit() {
        this.appbarService.appbarMenus
            .subscribe(routes => {
            this.routes = routes;
            this.isHomeMenu = routes == null;
            if (this.routes == null) {
                this.moduleSelected = '';
            }
            else {
                const moduleRootUrl = this.routes[0].url.split('/')[1];
                this.moduleSelected = homeMenu.find(m => m.url === moduleRootUrl).title;
            }
        });
        this.schoolyearsRepository.stream.subscribe(schoolYears => this.schoolYears = schoolYears);
        this.schoolYearService.schoolYear.subscribe(s => this.currentSchoolYear = s);
        this.phone.subscribe(result => {
            if (this.routes == null) {
                return;
            }
            this.usingPhone = true;
            this.usingTablet = false;
            this.usingWeb = false;
        });
        this.web.subscribe(result => {
            if (this.routes == null) {
                return;
            }
            this.usingPhone = false;
            this.usingTablet = false;
            this.usingWeb = true;
        });
        this.tablet.subscribe(result => {
            if (this.routes == null) {
                return;
            }
            if (this.routes.length >= 4) {
                this.usingPhone = true;
                this.usingTablet = false;
                this.usingWeb = false;
            }
            else {
                this.usingPhone = false;
                this.usingTablet = true;
                this.usingWeb = false;
            }
        });
    }
};
AppbarComponent = __decorate([
    Component({
        selector: 'app-appbar',
        templateUrl: './appbar.component.html',
        styleUrls: ['./appbar.component.scss']
    })
], AppbarComponent);
export { AppbarComponent };
//# sourceMappingURL=appbar.component.js.map