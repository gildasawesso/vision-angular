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
  btnMessage = 'Ajouter le type d\'examination';

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<AddOrEditExaminationTypeComponent>) {
    if (this.data.type) {
      this.type.patchValue(this.data.type.name);
      this.btnMessage = 'Modifier le type d\'examination';
    }
  }

  add() {
    this.dialogRef.close(this.type.value);
  }

  close() {
    this.dialogRef.close(null);
  }

  ngOnInit() {
  }

}
