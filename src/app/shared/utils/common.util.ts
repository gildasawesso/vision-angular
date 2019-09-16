import {Injectable} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AlertDialogComponent} from '../../shared/components/alert-dialog/alert-dialog.component';

@Injectable({providedIn: 'root'})
export class Common {

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  alert(body: string, title: string = 'Attention') {
    this.dialog.open(AlertDialogComponent, {
      data: {
        title,
        body
      }
    });
  }

  modal(component, data) {
    this.dialog.open(component, {
      panelClass: 'dialog-without-padding',
      minWidth: '95%',
      height: '85%',
      data
    });
  }

  toast(body: string) {
    this.snackBar.open(body, null, {
      duration: 5000
    });
  }

  countryFlag(countryCode: number) {

  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  compareFunction(o1: any, o2: any): boolean {
    return o1._id === o2._id;
  }

  pruneInputValue(inputValue) {
    const value = parseInt(inputValue, 0);
    if (!Number.isInteger(value)) {
      this.alert('Le nombre de pièce doit être un nombre');
    }
  }

  isValidNumber(userValue) {
    const value = Number(userValue);
    if (typeof value !== 'number') {
      return false;
    }
    return value > 0;
  }

}
