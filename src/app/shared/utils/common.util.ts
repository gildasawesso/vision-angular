import {Injectable} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AlertDialogComponent} from '../components/alert-dialog/alert-dialog.component';

@Injectable()
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
      minWidth: '60%',
      height: '85%',
      data
    });
  }

  async modalWithResult(component, data) {
    const dialog = this.dialog.open(component, {
      panelClass: 'dialog-without-padding',
      minWidth: '60%',
      height: '85%',
      data
    });

    return dialog.afterClosed().toPromise();
  }

  toast(body: string) {
    this.snackBar.open(body, null, {
      duration: 5000
    });
  }

  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
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

  invalidatedForm(partForm) {
    Object.keys(partForm.controls).forEach(field => { // {1}
      const control = partForm.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
    this.dialog.open(AlertDialogComponent, {
      data: {
        title: 'Le formulaire comporte des erreurs',
        body: 'Veuillez corriger les erreurs du formulaire afin de continuer'
      }
    });
  }

}
