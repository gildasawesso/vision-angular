import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-or-edit-examination-type',
  templateUrl: './add-or-edit-examination-type.component.html',
  styleUrls: ['./add-or-edit-examination-type.component.scss']
})
export class AddOrEditExaminationTypeComponent implements OnInit {

  type = new FormControl('', [Validators.required, Validators.minLength(2)]);
  group = new FormControl('', [Validators.required]);
  displayOrder = new FormControl('', [Validators.required]);
  btnMessage = 'Ajouter le type d\'examination';
  array = Array.from(Array(10).keys());

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<AddOrEditExaminationTypeComponent>) {
    if (this.data.type) {
      this.type.patchValue(this.data.type.name);
      this.group.patchValue(this.data.type.group ? this.data.type.group : 1, { emitEvent: true });
      this.displayOrder.patchValue(this.data.type.displayOrder ? this.data.type.displayOrder : 1, { emitEvent: true });
      console.log(this.data.type);
      this.btnMessage = 'Modifier le type d\'examination';
    }
  }

  add() {
    this.dialogRef.close({ name: this.type.value, group: this.group.value, displayOrder: this.displayOrder.value });
  }

  close() {
    this.dialogRef.close(null);
  }

  ngOnInit() {
  }

}
