import { Component, OnInit } from '@angular/core';
import {AddOrEditUserComponent} from '../users/add-or-edit-user/add-or-edit-user.component';
import {User} from '../../core/models/user';
import {Utils} from '../../core/shared/utils';
import {RolesRepository} from '../../core/repositories/roles.repository';
import {Role} from '../../core/models/role';
import {AddOrEditRoleComponent} from './add-or-edit-role/add-or-edit-role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  data: Role[];
  mapping = {
    name: 'Nom',
    'array permissions description |': 'Permissions',
    options: 'Options'
  };

  constructor(private utils: Utils, private rolesRepository: RolesRepository) { }

  async add() {
    await this.utils.common.modal(AddOrEditRoleComponent, { role: null });
  }

  async edit(role: Role) {
    await this.utils.common.modal(AddOrEditRoleComponent, { role });
  }

  async delete(user: User) {
    const result = await this.utils.common.customAlert('Confirmez-vous la suppression de ce rôle ?', 'Attention', ['OUI', 'NON']);
    if (result === 0) {
      await this.rolesRepository.remove(user._id);
      await this.utils.common.toast('Rôle supprimé avec succès');
    }
  }

  ngOnInit() {
    this.rolesRepository.stream
      .subscribe(roles => this.data = [...roles]);
  }
}
