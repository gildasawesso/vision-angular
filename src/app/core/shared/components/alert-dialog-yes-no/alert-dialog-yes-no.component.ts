import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-alert-dialog-yes-no',
  templateUrl: './alert-dialog-yes-no.component.html',
  styleUrls: ['./alert-dialog-yes-no.component.css']
})
export class AlertDialogYesNoComponent implements OnInit {


  title = '';
  body = '';

  constructor(@Inject(MAT_DIALOG_DATA)public data: any,
              private dialogRef: MatDialogRef<AlertDialogYesNoComponent>) {
    this.title = this.data.title;
    this.body = this.data.body;
  }

  yes(){
    this.dialogRef.close(true);
  }

  no(){
    this.dialogRef.close(false);
  }

  ngOnInit() {
  }

}
