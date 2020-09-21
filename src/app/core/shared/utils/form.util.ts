import {Injectable} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AbstractControl, ValidatorFn} from '@angular/forms';
import {Payment} from '../../models/payment';
import {FeeType} from '../../models/fee-type';

@Injectable()
export class FormUtil {

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  isValid(form) {
    if (form.valid) {
      return true;
    } else {
      Object.keys(form.controls).forEach(field => { // {1}
        const control = form.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });

      this.snackBar.open('Veuillez corriger les erreurs du formulaire afin de continuer s\'il vous plait', null, {
        duration: 5000
      });

      return false;
    }
  }

  invalidatedForm(form) {
    Object.keys(form.controls).forEach(field => { // {1}
      const control = form.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });

    this.snackBar.open('Veuillez corriger les erreurs du formulaire afin de continuer s\'il vous plait', null, {
      duration: 5000
    });
  }

  registrationFeeValidator(subPayment: {fee: FeeType, amount: number}): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (subPayment === undefined) { return null; }
      const error = `Le montant saisi est supérieur aux frais d'inscription`;
      return control.value > subPayment.fee.amount ? {invalid: error} : null;
    };
  }

  feeValidator(subPayment: {fee: FeeType, amount: number}): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (subPayment === undefined) { return null; }
      const error = `Le montant saisi est supérieur aux contributions`;
      return control.value > subPayment.fee.amount ? {invalid: error} : null;
    };
  }

}
