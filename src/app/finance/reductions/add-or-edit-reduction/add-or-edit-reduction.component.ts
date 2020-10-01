import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Utils} from '../../../core/shared/utils';
import {Registration} from '../../../core/models/registration';
import {FeeType} from '../../../core/models/fee-type';
import {FeeTypesRepository} from '../../../core/repositories/fee-types.repository';
import {AbstractControl, FormControl, Validators} from '@angular/forms';
import {RegistrationsRepository} from '../../../core/repositories/registrations.repository';
import {Reduction} from '../../../core/models/reduction';
import {Repositories} from '../../../core/repositories/repositories';

@Component({
  selector: 'app-add-or-edit-reduction',
  templateUrl: './add-or-edit-reduction.component.html',
  styleUrls: ['./add-or-edit-reduction.component.scss']
})
export class AddOrEditReductionComponent implements OnInit {

  registration: Registration;
  reduction: Reduction;
  index: number;
  fees: FeeType[];

  reductionType = new FormControl('amount', Validators.required);
  fee = new FormControl('', Validators.required);
  amount = new FormControl('', [this.validatePercentage(this.reductionType, this.fee), Validators.min(0)]);

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<AddOrEditReductionComponent>,
              private feeTypesRepository: FeeTypesRepository,
              private registrationsRepository: RegistrationsRepository,
              private utils: Utils,
              private repo: Repositories) {
    this.registration = this.data.registration;
    this.reduction = this.data.reduction;
    this.index = this.data.index;

    if (this.reduction) {
      this.reductionType.patchValue(this.reduction.reductionType);
      this.amount.patchValue(this.reduction.reduction);
      this.fee.patchValue(this.reduction.fee);
    }
  }

  validatePercentage(type: AbstractControl, fee: AbstractControl) {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (type.value === `percentage`) {
        if (Number(control.value) > 100 || Number(control.value) <= 0) {
          return { percentage : true };
        }
      } else {
        if (Number(control.value) > Number(fee.value.amount)) {
          return { exceeded: true };
        }
      }
      return null;
    };
  }

  async isReductionValid() {
    const pastPayments: number = await this.repo.payments.studentFeePayments(this.registration.student._id, this.fee.value?._id);
    const reduction = this.getReduction();
    console.log(Number(this.fee.value?.amount));
    console.log(pastPayments);
    console.log(reduction);
    const remainingFeePayment = Number(this.fee.value?.amount) - pastPayments - reduction;
    console.log('remining', remainingFeePayment);
    return remainingFeePayment >= 0;
  }

  async save() {
    const isReductionValid = await this.isReductionValid();
    console.log(isReductionValid);
    if (!isReductionValid) {
      this.utils.common.toast(`Le reste à payer après réduction est invalide, modifiez la valeur de la réduction`);
      return;
    }

    if (this.reductionType.valid && this.fee.valid && this.amount.valid) {
      if (this.reduction) {
        return this.edit();
      } else {
        return this.add();
      }
    }
    this.utils.common.toast(`Il existe des erreurs dans le formulaire`);
  }

  async add() {
    const reductionLike = new Reduction();
    reductionLike.reductionType = this.reductionType.value;
    reductionLike.reduction = this.amount.value;
    reductionLike.fee = this.fee.value._id;
    if (this.registration.reductions === undefined || this.registration.reductions == null) {
      this.registration.reductions = [];
    }
    this.registration.reductions.push(reductionLike);

    if (this.registration._id) {
      try {
        await this.registrationsRepository.update(this.registration, this.registration._id);
        this.utils.common.toast(`Réduction ajoutée avec succès`);
        this.dialogRef.close();
      } catch (e) {
        this.utils.common.toast(JSON.stringify(e));
      }
    } else {
      this.utils.common.toast(`Réduction ajoutée avec succès`);
      this.dialogRef.close();
    }
  }

  getReduction() {
    if (this.reductionType.value === 'percentage') {
      return Number(this.amount.value) / 100 * Number(this.fee.value.amount);
    } else {
      return Number(this.amount.value);
    }
  }

  async edit() {

  }

  ngOnInit(): void {
    this.feeTypesRepository.stream.subscribe(f => this.fees = f);
  }
}
