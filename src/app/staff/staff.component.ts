import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UsersRepository} from '../core/repositories/users.repository';
import {User} from '../core/models/user';
import {Utils} from '../core/shared/utils';
import {AddOrEditUserComponent} from './add-or-edit-user/add-or-edit-user.component';
import {Repositories} from '../core/repositories/repositories';

@Component({
  selector: 'app-users',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  users: User[];
  columns: any[];

  @ViewChild('fullname', {static: true}) fullnameTemplate: TemplateRef<any>;
  @ViewChild('role', {static: true}) roleTemplate: TemplateRef<any>;

  constructor(public usersRepository: UsersRepository,
              private repo: Repositories,
              private utils: Utils) { }

  async add() {
    await this.utils.common.modal(AddOrEditUserComponent, { user: null });
  }

  async edit(user: User) {
    await this.utils.common.modal(AddOrEditUserComponent, { user });
  }

  async delete(user: User) {
    const result = await this.utils.common.customAlert('Confirmez-vous la suppression de ce personnel ?', 'Attention', ['OUI', 'NON']);
    if (result === 0) {
      await this.usersRepository.remove(user._id);
      await this.utils.common.toast('Personnel supprimé avec succès');
    }
  }

  ngOnInit() {
    this.repo.users.stream.subscribe(users => this.users = [...users]);

    this.columns = [
      { name: 'Nom', cellTemplate: this.fullnameTemplate },
      { name: 'Fonction', prop: 'job' },
      { name: 'Rôle', cellTemplate: this.roleTemplate },
    ];
  }
}
