import {Component, Inject, OnInit} from '@angular/core';
import {FeeCategoriesRepository} from '../../../../core/repositories/fee-categories.repository';
import {FormArray, FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FeeTypesRepository} from '../../../../core/repositories/fee-types.repository';
import {Utils} from '../../../../core/shared/utils';
import {AddOrEditTrancheComponent} from '../add-or-edit-tranche/add-or-edit-tranche.component';

@Component({
  selector: 'app-add-or-edit-fee',
  templateUrl: './add-or-edit-fee-type.component.html',
  styleUrls: ['./add-or-edit-fee-type.component.scss']
})
export class AddOrEditFeeTypeComponent implements OnInit {

  title = `Ajout d'un type de contribution`;
  buttonSubmitText = 'Créer un type de contribution';
  contributionId: string;

  feeForm = this.formBuilder.group({
    name: [''],
    amount: [''],
    deadline: [''],
    isSchoolFee: [false],
    tranches: this.formBuilder.array([]),
    feeCategory: ['']
  });

  get tranches() {
    const array = this.feeForm.controls.tranches as FormArray;
    return array.controls;
  }

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public feeCategoriesRepository: FeeCategoriesRepository,
              private feeTypesRepository: FeeTypesRepository,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddOrEditFeeTypeComponent>,
              private utils: Utils) {
    if (this.data) {
      this.title = `Modification du type de contribution`;
      this.buttonSubmitText = `Modifier le type de contribution`;
      this.contributionId = this.data._id;
      this.feeForm.patchValue(this.data);

      const tranchesFormArray = this.feeForm.controls.tranches as FormArray;
      this.data.tranches.forEach(t => tranchesFormArray.push(this.formBuilder.group(t)));
    }
  }

  async addTranche() {
    const result = await this.utils.common.modalWithResult(AddOrEditTrancheComponent, null);
    if (result == null) { return; }
    const tranchesArray = this.feeForm.controls.tranches as FormArray;
    tranchesArray.push(this.formBuilder.group(result));
  }

  async updateTranche(trancheIndex) {
    const tranchesArray = this.feeForm.controls.tranches as FormArray;
    const tranche = tranchesArray.controls[trancheIndex];
    const result = await this.utils.common.modalWithResult(AddOrEditTrancheComponent, tranche.value);
    if (result == null) { return; }
    tranche.patchValue(result);
  }

  deleteTranche(trancheIndex) {
    const tranchesArray = this.feeForm.controls.tranches as FormArray;
    tranchesArray.removeAt(trancheIndex);
  }

  async save() {
    if (this.feeForm.valid) {
      const fee = this.feeForm.value;
      this.contributionId ? await this.update(fee, this.contributionId) : await this.create(fee);
      this.utils.common.toast('Opération réalisée avec succès');
      this.dialogRef.close();
    } else {
      this.utils.common.alert('Il existe des erreurs dans le formulaire');
    }
  }

  async create(fee) {
    await this.feeTypesRepository.add(fee);
  }

  async update(fee, id) {
    await this.feeTypesRepository.update(fee, id);
  }

  ngOnInit() {

  }

}
