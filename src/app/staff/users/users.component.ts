import { Component, OnInit } from '@angular/core';
import {UsersRepository} from '../../core/repositories/users.repository';
import {User} from '../../core/models/user';
import {Utils} from '../../core/shared/utils';
import {AddOrEditUserComponent} from './add-or-edit-user/add-or-edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  data: User[];
  mapping = {
    'append firstname lastname': 'Nom',
    job: 'Fonction',
    'array roles name': 'Role',
    options: 'Options'
  };

  constructor(public usersRepository: UsersRepository,
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
    this.usersRepository.stream
      .subscribe(users => this.data = [...users]);
  }

}
