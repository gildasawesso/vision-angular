import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'gen-alert-dialog-yes-with-input',
  templateUrl: './alert-dialog-yes-with-input.component.html',
  styleUrls: ['./alert-dialog-yes-with-input.component.css']
})
export class AlertDialogYesWithInputComponent implements OnInit {

  title = '';
  inputTitle: string = '';
  inputValue: string = '';

  constructor(@Inject(MAT_DIALOG_DATA)public data: any,
              private dialogRef: MatDialogRef<AlertDialogYesWithInputComponent>) {
    this.title = this.data.title;
    this.inputTitle = this.data.inputTitle;
  }

  yes(){
    this.dialogRef.close(this.inputValue);
  }

  no(){
    this.dialogRef.close(null);
  }

  ngOnInit() {
  }

}
