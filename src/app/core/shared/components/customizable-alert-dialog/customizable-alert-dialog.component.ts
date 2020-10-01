import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-customizable-alert-dialog',
  templateUrl: './customizable-alert-dialog.component.html',
  styleUrls: ['./customizable-alert-dialog.component.scss']
})
export class CustomizableAlertDialogComponent implements OnInit {

  title = '';
  body = '';
  actions: any[];
  buttonsNumber: number;

  constructor(@Inject(MAT_DIALOG_DATA)public data: any,
              public dialogRef: MatDialogRef<CustomizableAlertDialogComponent>) {
    this.title = this.data.title;
    this.body = this.data.body;
    this.actions = this.data.actions || ['OK'];
    this.buttonsNumber = this.data.actions.length;
  }

  ngOnInit() {
  }

}
