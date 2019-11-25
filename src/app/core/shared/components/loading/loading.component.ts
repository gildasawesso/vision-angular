import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  message;

  constructor(@Inject(MAT_DIALOG_DATA)public data: any) {
    this.message = data.message;
  }

  ngOnInit() {
  }

}
