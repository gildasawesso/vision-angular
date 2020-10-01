import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Utils} from '../../core/shared/utils';
import {Registration} from '../../core/models/registration';
import {AddOrEditReductionComponent} from './add-or-edit-reduction/add-or-edit-reduction.component';
import {Reduction} from '../../core/models/reduction';
import {RegistrationsRepository} from '../../core/repositories/registrations.repository';
import {Repositories} from '../../core/repositories/repositories';

@Component({
  selector: 'app-reductions',
  templateUrl: './reductions.component.html',
  styleUrls: ['./reductions.component.scss']
})
export class ReductionsComponent implements OnInit {

  registration: Registration;
  fees: {string, any};

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<ReductionsComponent>,
              private utils: Utils,
              private registrationsRepository: RegistrationsRepository,
              private repo: Repositories) {
    this.registration = this.data;
  }

  async addReduction() {
    await this.utils.common.modal(AddOrEditReductionComponent, {
      registration: this.registration,
    });
  }

  async editReduction(reduction: Reduction, index: number) {
    await this.utils.common.modal(AddOrEditReductionComponent, {
      registration: this.registration,
      reduction,
      index
    });
  }

  async deleteReduction(reduction: Reduction, index: number) {
    this.registration.reductions.splice(index, 1);
    if (this.registration._id) {
      await this.registrationsRepository.update(this.registration, this.registration._id);
    }
  }

  ngOnInit(): void {
    this.repo.fees.stream.subscribe(fees => {
      const map = fees.map(fee => [fee._id, fee]);
      this.fees = Object.fromEntries(map);
    });
  }
}
