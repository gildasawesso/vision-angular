import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {FeeTypesRepository} from '../../../../core/repositories/fee-types.repository';
import {FeeType} from '../../../../models/fee-type';
import {Utils} from '../../../../shared/utils';

@Component({
  selector: 'app-fee-types',
  templateUrl: './fee-types.component.html',
  styleUrls: ['./fee-types.component.scss']
})
export class FeeTypesComponent implements OnInit {

  name = new FormControl('');
  buttonText = 'Ajouter un nouveau type';
  selectedId = null;

  constructor(public feeTypesRepository: FeeTypesRepository,
              private utils: Utils) { }

  ngOnInit() {
  }

  edit(feeType: FeeType) {
    this.buttonText = 'Modifier le type';
    this.name.patchValue(feeType.name);
    this.selectedId = feeType._id;
  }

  async delete(feeType: FeeType) {
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
