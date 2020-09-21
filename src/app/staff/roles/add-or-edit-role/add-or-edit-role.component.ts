import {Component, Inject, OnInit} from '@angular/core';
import {PermissionsService} from '../../../core/services/permissions.service';
import {Role} from '../../../core/models/role';
import {FormBuilder} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Utils} from '../../../core/shared/utils';
import {RolesRepository} from '../../../core/repositories/roles.repository';
import {Permission} from '../../../core/models/permission';

@Component({
  selector: 'app-add-or-edit-role',
  templateUrl: './add-or-edit-role.component.html',
  styleUrls: ['./add-or-edit-role.component.scss']
})
export class AddOrEditRoleComponent implements OnInit {

  permissions: Permission[];
  role: Role;
  rolesForm = this.formBuilder.group({
    name: [''],
    permissions: ['']
  });
  title = 'Ajouter un rôle';
  submitText = 'Ajouter';

  constructor(private permissionsService: PermissionsService,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<AddOrEditRoleComponent>,
              private rolesRepository: RolesRepository,
              private utils: Utils) {
    if (data.role) {
      this.rolesForm.patchValue(data.role);
      this.role = data.role;
      this.title = 'Modification du rôle';
      this.submitText = 'Modifier';
    }
  }

  async userPermissions() {
    this.permissions = await this.permissionsService.allPermissions;
  }

  save() {
    if (this.utils.form.isValid(this.rolesForm)) {
      this.role == null ? this.create() : this.update();
    } else {
      this.utils.common.toast('Il existe des erreurs dans le formulaire');
    }
  }

  async create() {
    const user = this.rolesForm.value;
    await this.rolesRepository.add(user);
    this.utils.common.toast('Rôle ajouté avec succès');
    this.close();
  }

  async update() {
    const role = this.rolesForm.value;
    role._id = this.role._id;
    await this.rolesRepository.update(role, this.role._id);
    this.utils.common.toast('Rôle modifié avec succès');
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.userPermissions();
  }

}
