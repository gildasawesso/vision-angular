import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AddOrEditUserComponent} from '../add-or-edit-user/add-or-edit-user.component';
import {User} from '../../core/models/user';
import {Utils} from '../../core/shared/utils';
import {RolesRepository} from '../../core/repositories/roles.repository';
import {Role} from '../../core/models/role';
import {AddOrEditRoleComponent} from './add-or-edit-role/add-or-edit-role.component';
import {Repositories} from '../../core/repositories/repositories';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  roles: Role[];
  columns: any[];

  @ViewChild('permissions', {static: true}) permissionsTemplate: TemplateRef<any>;

  constructor(private utils: Utils,
              private repo: Repositories,
              private rolesRepository: RolesRepository
  ) { }

  async add() {
    await this.utils.common.modal(AddOrEditRoleComponent, { role: null }, false);
  }

  async edit(role: Role) {
    await this.utils.common.modal(AddOrEditRoleComponent, { roleId: role._id });
  }

  async delete(user: User) {
    const result = await this.utils.common.customAlert('Confirmez-vous la suppression de ce rôle ?', 'Attention', ['OUI', 'NON']);
    if (result === 0) {
      await this.rolesRepository.remove(user._id);
      await this.utils.common.toast('Rôle supprimé avec succès');
    }
  }

  ngOnInit() {
    this.repo.roles.stream.subscribe(roles => this.roles = [...roles]);

    this.columns = [
      { name: 'Nom', prop: 'name' },
      { name: 'Permissions', cellTemplate: this.permissionsTemplate },
    ];
  }
}
