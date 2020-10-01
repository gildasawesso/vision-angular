import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Utils} from '../../../core/shared/utils';
import {SpendingTypesRepository} from '../../../core/repositories/spendingTypes.repository';
import {SpendingType} from '../../../core/models/spending-type';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-expense-types',
  templateUrl: './expense-types.component.html',
  styleUrls: ['./expense-types.component.scss']
})
export class ExpenseTypesComponent implements OnInit {

  name = new FormControl('');
  buttonText = 'Ajouter un nouveau type';
  selectedId = null;

  constructor(public spendingTypesRepository: SpendingTypesRepository,
              private utils: Utils,
              private auth: AuthService) { }

  edit(spendingType: SpendingType) {
    this.buttonText = 'Modifier le type';
    this.name.patchValue(spendingType.name);
    this.selectedId = spendingType._id;
  }

  async delete(spendingType: SpendingType) {
    await this.spendingTypesRepository.remove(spendingType._id);
  }

  async save() {
    if (this.isEmpty()) {
      this.utils.common.toast('Le Type ne pas doit être vide');
    } else {
      const user = await this.auth.getCurrentUser();
      if (this.selectedId == null) {
        const type: any = {
          name: this.name.value,
          school: user.schools[0]
        };
        await this.spendingTypesRepository.add(type);
      } else {
        const type: any = { name: this.name.value };
        await this.spendingTypesRepository.update(type, this.selectedId);
      }
    }

    this.name.reset();
    this.selectedId = null;
    this.buttonText = 'Ajouter un nouveau type';
  }

  isEmpty() {
    return this.name.value.trim() === '';
  }

  ngOnInit() {
  }

}
