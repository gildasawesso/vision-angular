import { Component, OnInit } from '@angular/core';
import {AppbarService} from '../../../core/services/appbar.service';
import {homeMenu} from '../../home-menu';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AuthService} from '../../../core/services/auth.service';
import {SchoolyearsRepository} from '../../../core/repositories/schoolyears.repository';
import {SchoolYear} from '../../../core/models/school-year';
import {Utils} from '../../../core/shared/utils';
import {SchoolSession} from '../../../core/models/school-session';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit {

  routes: Array<{text: string, url: string}>;
  isHomeMenu = false;
  moduleSelected: string;

  schoolYears: SchoolYear[];
  currentSchoolYear: SchoolYear;
  currentTerm: SchoolSession;

  usingPhone: boolean;
  usingTablet: boolean;
  usingWeb: boolean;

  phone = this.breakpointObserver.observe([
    Breakpoints.Handset,
  ]);

  tablet = this.breakpointObserver.observe([
    Breakpoints.Tablet,
  ]);

  web = this.breakpointObserver.observe([
    Breakpoints.Tablet,
  ]);

  constructor(private appbarService: AppbarService,
              private breakpointObserver: BreakpointObserver,
              private schoolyearsRepository: SchoolyearsRepository,
              public auth: AuthService) { }

  async signout() {
    await this.auth.signout();
  }

  onSchoolYearChange(e) {
    console.log(e);
  }

  onTermChanged(e) {
    console.log(e);
  }

  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }

  compareTermFn(c1, c2): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2;
  }

  ngOnInit() {
    this.appbarService.appbarMenus
      .subscribe(routes => {
        this.routes = routes;
        this.isHomeMenu = routes == null;
        if (this.routes == null) {
          this.moduleSelected = '';
        } else {
          const moduleRootUrl = this.routes[0].url.split('/')[1];
          this.moduleSelected = homeMenu.find(m => m.url === moduleRootUrl).title;
        }
      });

    this.schoolyearsRepository.stream.subscribe(schoolYears => this.schoolYears = schoolYears);
    this.schoolyearsRepository.selectedSchoolYear.subscribe(s => this.currentSchoolYear = s);
    this.schoolyearsRepository.selectedSchoolYearTerm.subscribe(t => this.currentTerm = t);

    this.phone.subscribe(result => {
      if (this.routes == null) { return; }
      this.usingPhone = true;
      this.usingTablet = false;
      this.usingWeb = false;
    });

    this.web.subscribe(result => {
      if (this.routes == null) { return; }
      this.usingPhone = false;
      this.usingTablet = false;
      this.usingWeb = true;
    });

    this.tablet.subscribe(result => {
      if (this.routes == null) { return; }
      if (this.routes.length >= 4) {
        this.usingPhone = true;
        this.usingTablet = false;
        this.usingWeb = false;
      } else {
        this.usingPhone = false;
        this.usingTablet = true;
        this.usingWeb = false;
      }
    });
  }
}
