import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-add-or-edit-tranche',
  templateUrl: './add-or-edit-tranche.component.html',
  styleUrls: ['./add-or-edit-tranche.component.scss']
})
export class AddOrEditTrancheComponent implements OnInit {

  title = `Ajout d'une tranche`;
  buttonSubmitText = 'Créer une tranche';

  trancheForm = this.formBuilder.group({
    name: [''],
    dueDate: [''],
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddOrEditTrancheComponent>) {
    if (this.data) {
      this.title = `Modification d'une tranche`;
      this.buttonSubmitText = `Modifier la tranche`;
      this.trancheForm.patchValue(this.data);
    }
  }

  save() {
    this.dialogRef.close(this.trancheForm.value);
  }

  ngOnInit() {
  }

}
