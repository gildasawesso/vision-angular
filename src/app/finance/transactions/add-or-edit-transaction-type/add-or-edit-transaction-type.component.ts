import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Utils} from '../../../core/shared/utils';

@Component({
  selector: 'app-add-or-edit-transaction-type',
  templateUrl: './add-or-edit-transaction-type.component.html',
  styleUrls: ['./add-or-edit-transaction-type.component.scss']
})
export class AddOrEditTransactionTypeComponent implements OnInit {

  message: string;
  name = '';
  isEdit = false;

  constructor(private dialogRef: MatDialogRef<AddOrEditTransactionTypeComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private utils: Utils) {
    this.message = this.data.message;
    this.name = this.data.name;
    if (this.name) {
      this.isEdit = true;
    }
  }

  close() {
    this.dialogRef.close(null);
  }

  save() {
    if (this.name === undefined || this.name == null || this.name.trim() === '') {
      this.utils.common.toast(`Le type ne peut pas être vide`);
      return;
    }
    this.dialogRef.close(this.name.trim());
  }

  ngOnInit(): void {
  }
}
