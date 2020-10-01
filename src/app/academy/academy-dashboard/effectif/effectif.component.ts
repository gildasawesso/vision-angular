import {Component, OnInit} from '@angular/core';
import {Color, SingleDataSet} from 'ng2-charts';
import {Observable} from 'rxjs';
import {Services} from '../../../core/services/services';
import {ChartOptions} from 'chart.js';

@Component({
  selector: 'app-effectif',
  templateUrl: './effectif.component.html',
  styleUrls: ['./effectif.component.scss']
})
export class EffectifComponent implements OnInit {

  options: ChartOptions = {
    plugins: {
      datalabels: {
        color: '#ffffff'
      }
    },
  };
  data: Observable<SingleDataSet>;
  labels = ['Garçon', 'Fille'];
  colors: Color[] = [
    { backgroundColor: ['#396afc', '#f953c6'] }
  ];

  constructor(private services: Services) {
  }

  ngOnInit() {
    this.data = this.services.statsStudent.schoolGenders;
  }
}
