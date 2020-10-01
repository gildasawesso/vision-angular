import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {WorkInProgressComponent} from '../shared/components/work-in-progress/work-in-progress.component';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  isBusy = new BehaviorSubject(false);
  private dialogRef: MatDialogRef<any>;

  started(message: string) {
    this.dialogRef = this.dialog.open(WorkInProgressComponent, {
      data: message,
      minWidth: 400,
      hasBackdrop: false
    });
  }

  ended() {
    this.dialogRef?.close();
  }

  constructor(private dialog: MatDialog) {

  }
}
