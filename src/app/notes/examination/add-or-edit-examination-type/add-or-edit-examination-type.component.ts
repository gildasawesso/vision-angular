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

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<AddOrEditExaminationTypeComponent>) {
    if (this.data.type) {
      this.type.patchValue(this.data.type);
    }
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(null);
  }

  add() {
    this.dialogRef.close(this.type.value);
  }

}
