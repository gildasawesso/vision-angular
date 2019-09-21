import {Injectable} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';

@Injectable()
export class FormUtil {

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  invalidatedForm(partForm) {
    Object.keys(partForm.controls).forEach(field => { // {1}
      const control = partForm.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });

    this.snackBar.open('Veuillez corriger les erreurs du formulaire afin de continuer s\'il vous plait', null, {
      duration: 5000
    });
  }

}
