import {Component, Inject, OnInit} from '@angular/core';
import {FeeTypesRepository} from '../../../../core/repositories/fee-types.repository';
import {FormArray, FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FeesRepository} from '../../../../core/repositories/fees.repository';
import {Utils} from '../../../../shared/utils';
import {AddOrEditTrancheComponent} from '../add-or-edit-tranche/add-or-edit-tranche.component';

@Component({
  selector: 'app-add-or-edit-fee',
  templateUrl: './add-or-edit-fee.component.html',
  styleUrls: ['./add-or-edit-fee.component.scss']
})
export class AddOrEditFeeComponent implements OnInit {

  title = `Ajout d'une contribution`;
  buttonSubmitText = 'Créer une contribution';
  contributionId: string;

  feeForm = this.formBuilder.group({
    name: [''],
    amount: [''],
    deadline: [''],
    isSchoolFee: [false],
    tranches: this.formBuilder.array([]),
    feeType: ['']
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public feeTypesRepository: FeeTypesRepository,
              private feesRepository: FeesRepository,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddOrEditFeeComponent>,
              private utils: Utils) {
    if (this.data) {
      this.title = `Modification d'une contribution`;
      this.buttonSubmitText = `Modifier la contribution`;
      this.contributionId = this.data._id;
      this.feeForm.patchValue(this.data);

      const tranchesFormArray = this.feeForm.controls.tranches as FormArray;
      this.data.tranches.forEach(t => tranchesFormArray.push(this.formBuilder.group(t)));
    }
  }

  async addTranche() {
    const result = await this.utils.common.modalWithResult(AddOrEditTrancheComponent, null);
    const tranchesArray = this.feeForm.controls.tranches as FormArray;
    tranchesArray.push(this.formBuilder.group(result));
  }

  async updateTranche(trancheIndex) {
    const tranchesArray = this.feeForm.controls.tranches as FormArray;
    const tranche = tranchesArray.controls[trancheIndex];
    const result = await this.utils.common.modalWithResult(AddOrEditTrancheComponent, tranche.value);
    tranche.patchValue(result);
  }

  deleteTranche(trancheIndex) {
    const tranchesArray = this.feeForm.controls.tranches as FormArray;
    tranchesArray.removeAt(trancheIndex);
  }

  async save() {
    if (this.feeForm.valid) {
      const fee = this.feeForm.value;
      console.log(fee);
      this.contributionId ? await this.update(fee, this.contributionId) : await this.create(fee);
      this.utils.common.toast('Opération réalisée avec succès');
      this.dialogRef.close();
    } else {
      this.utils.common.alert('Il existe des erreurs dans le formulaire');
    }
  }

  async create(fee) {
    await this.feesRepository.add(fee);
  }

  async update(fee, id) {
    await this.feesRepository.update(fee, id);
  }

  ngOnInit() {

  }

}
