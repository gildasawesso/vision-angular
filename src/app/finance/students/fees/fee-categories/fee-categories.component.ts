import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {FeeCategory} from '../../../../core/models/fee-category';
import {Utils} from '../../../../core/shared/utils';

@Component({
  selector: 'app-fee-types',
  templateUrl: './fee-categories.component.html',
  styleUrls: ['./fee-categories.component.scss']
})
export class FeeCategoriesComponent implements OnInit {

  name = new FormControl('');
  buttonText = 'Ajouter un nouveau type';
  selectedId = null;

  constructor(public feeTypesRepository: FeeCategoriesRepository,
              private utils: Utils) { }

  ngOnInit() {
  }

  edit(feeType: FeeCategory) {
    this.buttonText = 'Modifier le type';
    this.name.patchValue(feeType.name);
    this.selectedId = feeType._id;
  }

  async delete(feeType: FeeCategory) {
    await this.feeTypesRepository.remove(feeType._id);
  }

  async save() {
    if (this.isEmpty()) {
      this.utils.common.toast('Le Type ne doit être vide');
    } else {
      if (this.selectedId == null) {
        const fee: any = { name: this.name.value };
        await this.feeTypesRepository.add(fee);
      } else {
        const fee: any = { name: this.name.value };
        await this.feeTypesRepository.update(fee, this.selectedId);
      }
    }

    this.name.reset();
    this.selectedId = null;
    this.buttonText = 'Ajouter un nouveau type';
  }

  isEmpty() {
    return this.name.value.trim() === '';
  }

}
