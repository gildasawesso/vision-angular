import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {

  title = '';
  body = '';

  constructor(@Inject(MAT_DIALOG_DATA)public data: any) {
    this.title = this.data.title;
    this.body = this.data.body;
  }

  ngOnInit() {
  }

}
