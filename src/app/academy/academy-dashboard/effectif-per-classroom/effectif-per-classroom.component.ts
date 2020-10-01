import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ClassroomsRepository} from '../../../core/repositories/classrooms.repository';
import {RegistrationsRepository} from '../../../core/repositories/registrations.repository';
import {flatMap, map, mergeMap} from 'rxjs/operators';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Repositories} from '../../../core/repositories/repositories';
import {combineLatest} from 'rxjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Services} from '../../../core/services/services';


@Component({
  selector: 'app-effectif-per-classroom',
  templateUrl: './effectif-per-classroom.component.html',
  styleUrls: ['./effectif-per-classroom.component.scss']
})
export class EffectifPerClassroomComponent implements OnInit, AfterViewInit {

  labels;
  chartDataLabels = ChartDataLabels;

  public barChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 3.2,
    plugins: {
      datalabels: {
        color: '#ffffff',
        padding: 2
      }
    },
    scales: {
      xAxes: [
        {
          gridLines: { display: false },
        }
      ],
      yAxes: [
        {
          gridLines: { drawOnChartArea: false }
        }
      ]
    }
  };

  barChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Effectif par classe',
      backgroundColor: 'rgb(54,181,183)',
      barPercentage: 1,
      borderCapStyle: 'round',
      hoverBackgroundColor: '#90e3e5'
    },
  ];

  constructor(private classroomsRepository: ClassroomsRepository,
              private registrationsRepository: RegistrationsRepository,
              private repo: Repositories,
              private change: ChangeDetectorRef,
              private services: Services) {
  }

  ngOnInit() {
    this.labels = this.classroomsRepository.stream.pipe(
      map(classrooms => classrooms.map(c => c.name))
    );
  }

  ngAfterViewInit() {
    this.services.statsStudent.effectifByClassroom.subscribe(data => {
      this.barChartData[0].data = data;
      this.change.detectChanges();
    });
  }
}
