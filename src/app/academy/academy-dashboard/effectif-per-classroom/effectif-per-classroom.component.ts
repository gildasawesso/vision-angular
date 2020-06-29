import {Component, OnInit} from '@angular/core';
import {ClassroomsRepository} from '../../../core/repositories/classrooms.repository';
import {RegistrationsRepository} from '../../../core/repositories/registrations.repository';
import {flatMap, map, mergeMap} from 'rxjs/operators';
import {ChartDataSets, ChartOptions} from 'chart.js';


@Component({
  selector: 'app-effectif-per-classroom',
  templateUrl: './effectif-per-classroom.component.html',
  styleUrls: ['./effectif-per-classroom.component.scss']
})
export class EffectifPerClassroomComponent implements OnInit {

  labels;
  data = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{}], yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartData: ChartDataSets[] = [
    {data: [], label: 'Effectif par classe'},
  ];

  constructor(private classroomsRepository: ClassroomsRepository,
              private registrationsRepository: RegistrationsRepository) {
  }

  ngOnInit() {
    this.labels = this.classroomsRepository.stream.pipe(
      map(classrooms => classrooms.map(c => c.name))
    );

    this.registrationsRepository.stream
      .pipe(
        mergeMap(registrations => {
          return this.classroomsRepository.stream
            .pipe(
              map(v => {
                this.data = [];
                return v;
              }),
              flatMap(c => c),
              map(classroom => {
                return this.registrationsRepository.studentsForClassroom(registrations, classroom).length;
              }),
            );
        }),
      )
      .subscribe(value => {
        this.data.push(value);
        this.barChartData[0].data = this.data;
      });
  }
}
