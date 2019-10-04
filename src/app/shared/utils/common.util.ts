import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {AlertDialogComponent} from '../components/alert-dialog/alert-dialog.component';
import {CustomizableAlertDialogComponent} from '../components/customizable-alert-dialog/customizable-alert-dialog.component';

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

  async customAlert(body: string, title: string = 'Attention', actions: any[] = ['OK']) {
    const dialog = this.dialog.open(CustomizableAlertDialogComponent, {
      data: {
        title,
        body,
        actions
      }
    });

    return dialog.afterClosed().toPromise();
  }

  modal(component, data, noPadding = false): Promise<MatDialogRef<any>> {
    const dialog: MatDialogRef<any> = this.dialog.open(component, {
      panelClass: noPadding ? 'dialog-without-padding' : '',
      minWidth: '60%',
      height: '85%',
      data
    });

    return dialog.afterClosed().toPromise();
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

  spaced(value, suffix) {
    if (value === undefined || value == null ) { return value; }
    return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + suffix;
  }

}
