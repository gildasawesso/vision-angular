import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {map} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {ClassroomsRepository} from '../../core/repositories/classrooms.repository';
import {SubjectsRepository} from '../../core/repositories/subjects.repository';
import {TeachersRepository} from '../../core/repositories/teachers.repository';
import {EffectifComponent} from './effectif/effectif.component';
import {ChartHostDirective} from '../../core/shared/directives/chart-host.directive';
import {Utils} from '../../core/shared/utils';
import {RegistrationsRepository} from '../../core/repositories/registrations.repository';
import {EffectifPerClassroomComponent} from './effectif-per-classroom/effectif-per-classroom.component';

@Component({
  selector: 'app-academy-dashboard',
  templateUrl: './academy-dashboard.component.html',
  styleUrls: ['./academy-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademyDashboardComponent implements OnInit, AfterViewInit {

  @ViewChildren(ChartHostDirective) chartHosts: QueryList<any>;
  pkiTileHeigth = 130;
  pkiCards: any[] = [];
  registrations = [];


  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
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
        { title: 'Effectif par classe', cols: 2, rows: 1, component: EffectifPerClassroomComponent },
        // { title: 'Effectif par classe', cols: 2, rows: 1, component: EffectifComponent },
        // { title: 'courses', cols: 1, rows: 1 },
        // { title: 'professors', cols: 1, rows: 1 },
        // { title: 'Card 2', cols: 1, rows: 1 },
        // { title: 'Card 3', cols: 1, rows: 2 },
        // { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
              private registrationsRepository: RegistrationsRepository,
              private classroomsRepository: ClassroomsRepository,
              private subjectsRepository: SubjectsRepository,
              private teachersRepository: TeachersRepository,
              private componentFactoryResolver: ComponentFactoryResolver,
              private utils: Utils,
              private changeDetector: ChangeDetectorRef) {

  }

  component(viewContainer: ViewContainerRef) {
    const component = EffectifComponent;
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    viewContainer.createComponent(factory);
  }

  ngOnInit(): void {
    this.pkiCards = [
      {title: 'Élèves', cols: 1, rows: 1, value: this.registrationsRepository.stream, color: 'linear-gradient(to right, #f953c6, #b91d73)'},
      {
        title: 'Classes',
        cols: 1,
        rows: 1,
        value: this.classroomsRepository.stream,
        color: 'linear-gradient(90deg, rgb(54, 181, 183) 0%,rgb(19, 126, 105) 100%)'
      },
      {title: 'Cours', cols: 1, rows: 1, value: this.subjectsRepository.stream, color: 'linear-gradient(to right, #396afc, #2948ff)'},
      {title: 'Professeurs', cols: 1, rows: 1, value: this.teachersRepository.stream, color: 'linear-gradient(to right, #da22ff, #9733ee)'}
    ];
  }

  ngAfterViewInit() {
    this.chartHosts.map(chart => {
      this.utils.common.renderComponent(chart.viewContainer, chart.component);
    });
    this.changeDetector.detectChanges();
  }
}
