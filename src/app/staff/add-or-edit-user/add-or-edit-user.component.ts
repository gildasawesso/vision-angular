import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Utils} from '../../core/shared/utils';
import {UsersRepository} from '../../core/repositories/users.repository';
import {User} from '../../core/models/user';
import {RolesRepository} from '../../core/repositories/roles.repository';
import {SchoolsRepository} from '../../core/repositories/schools.repository';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-or-edit-user.component.html',
  styleUrls: ['./add-or-edit-user.component.scss']
})
export class AddOrEditUserComponent implements OnInit {

  title = 'Ajout d\'un personnel';
  submitText = 'Ajouter';
  userForm = this.formBuilder.group({
    username: [''],
    firstname: [''],
    lastname: [''],
    gender: ['M'],
    job: [''],
    password: [''],
    schools: [],
    roles: [],
    isAdmin: [false],
  });
  user: User;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<AddOrEditUserComponent>,
              private utils: Utils,
              private usersRepository: UsersRepository,
              public rolesRepository: RolesRepository,
              private schoolsRepository: SchoolsRepository)  {
    if (data.user) {
      this.userForm.patchValue(data.user);
      this.user = data.user;
      this.title = 'Modification d\'un personnel';
      this.submitText = 'Modifier';
    }
  }

  save() {
    if (this.utils.form.isValid(this.userForm)) {
      this.user == null ? this.create() : this.update();
    } else {
      this.utils.common.toast('Il existe des erreurs dans le formulaire');
    }
  }

  async create() {
    const user = this.userForm.value;
    user.schools = this.schoolsRepository.list[0];
    await this.usersRepository.add(user);
    this.utils.common.toast('Personnel ajouté avec succès');
    this.close();
  }

  async update() {
    const user = this.userForm.value;
    user._id = this.user._id;
    await this.usersRepository.update(user, this.user._id);
    this.utils.common.toast('Personnel modifié avec succès');
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
