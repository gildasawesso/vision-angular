import { Component, OnInit } from '@angular/core';
import {Color} from 'ng2-charts';
import {ChartOptions} from 'chart.js';
import {Services} from '../../../core/services/services';

@Component({
  selector: 'app-past-and-new-students',
  templateUrl: './past-and-new-students.component.html',
  styleUrls: ['./past-and-new-students.component.scss']
})
export class PastAndNewStudentsComponent implements OnInit {

  labels = ['Anciens élèves', 'Nouveaux élèves'];
  data;
  colors: Color[] = [
    { backgroundColor: ['#ee3b55', '#0bc182'] }
  ];
  options: ChartOptions = {
    plugins: {
      datalabels: {
        color: '#ffffff'
      }
    },
  };

  constructor(private services: Services) { }

  ngOnInit(): void {
    this.data = this.services.statsStudent.pastAndNewStudents;
  }
}
