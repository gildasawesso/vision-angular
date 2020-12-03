import {Component, Inject, OnInit} from '@angular/core';
import {PermissionsService} from '../../../core/services/permissions.service';
import {Role} from '../../../core/models/role';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Utils} from '../../../core/shared/utils';
import {RolesRepository} from '../../../core/repositories/roles.repository';
import {Permission} from '../../../core/models/permission';
import {Services} from '../../../core/services/services';
import {constants} from '../../../core/constants';
import {Repositories} from '../../../core/repositories/repositories';

@Component({
  selector: 'app-add-or-edit-role',
  templateUrl: './add-or-edit-role.component.html',
  styleUrls: ['./add-or-edit-role.component.scss']
})
export class AddOrEditRoleComponent implements OnInit {

  allPermissions: Permission[];
  role: Role;

  get permissionModulesArray() {
    return this.permissionsForm.controls.modules as FormArray;
  }

  permissionsForm = this.formBuilder.group({
    modules: new FormArray([])
  });

  roleNameFormControl = new FormControl('');
  constants = constants;

  constructor(private permissionsService: PermissionsService,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<AddOrEditRoleComponent>,
              private rolesRepository: RolesRepository,
              private services: Services,
              private repo: Repositories,
              private utils: Utils) {

  }

  save() {
    if (this.utils.form.isValid(this.roleNameFormControl)) {
      const permissions = this.permissionsForm.value.modules.map(module => module.permissions).reduce((acc, cur) => [...acc, ...cur]);
      const permissionsChecked = permissions.filter(permission => permission.checked).map(permission => permission.name);
      const schoolId = this.services.auth.snapshot.schools[0];
      const role: Role = {
        name: this.roleNameFormControl.value,
        permissions: permissionsChecked,
        schoolId
      };
      if (this.role) {
        this.repo.roles.update(role, this.role._id);
        this.utils.common.toast('Rôle modifié avec succès');
      } else {
        this.repo.roles.add(role);
        this.utils.common.toast('Rôle ajouté avec succès');
      }
      this.close();
    } else {
      this.utils.common.toast('Il existe des erreurs dans le formulaire');
    }
  }

  close() {
    this.dialogRef.close();
  }

  buildPermissionsForm() {
    constants.permissions.forEach(module => {
      this.permissionModulesArray.push(this.formBuilder.group({
        name: module.name,
        permissions : this.formBuilder.array(module.permissions.map(permission => {
          return this.formBuilder.group({
            name: permission.name,
            description: permission.description,
            checked: this.roleHaveThisPermission(permission)
          });
        }))
      }));
    });
  }

  roleHaveThisPermission(permission: Permission) {
    return this.role ? this.role.permissions.includes(permission.name) : false;
  }

  async init() {
    if (this.data.roleId) {
      this.role = await this.repo.roles.one(this.data.roleId);
      this.roleNameFormControl.patchValue(this.role.name);
    }
    this.buildPermissionsForm();
  }

  ngOnInit() {
    this.allPermissions = this.services.permission.allPermissions;
    this.init();
  }
}
