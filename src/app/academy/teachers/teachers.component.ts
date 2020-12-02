import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Utils} from '../../core/shared/utils';
import {TeachersRepository} from '../../core/repositories/teachers.repository';
import {AddOrEditTeacherComponent} from './add-or-edit-teacher/add-or-edit-teacher.component';
import {Teacher} from '../../core/models/teacher';
import {Repositories} from '../../core/repositories/repositories';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeachersComponent implements OnInit, AfterViewInit {

  teachers: Observable<Teacher[]>;
  columns = [];

  @ViewChild('fullname', {static: true}) fullnameTemplate: TemplateRef<any>;

  constructor(private utils: Utils,
              private repo: Repositories,
              public teachersRepository: TeachersRepository) { }

  async add() {
    await this.utils.common.modal(AddOrEditTeacherComponent, { teacherId: null });
  }

  async edit(teacher: Teacher) {
    await this.utils.common.modal(AddOrEditTeacherComponent, { teacherId: teacher._id });
  }

  async delete(teacher: Teacher) {
    await this.repo.teachers.remove(teacher._id);
  }

  ngOnInit() {
    this.teachers = this.repo.teachers.stream;
  }

  ngAfterViewInit() {
    this.columns = [
      { name: 'Nom', cellTemplate: this.fullnameTemplate },
      { name: 'Sexe', prop: 'gender' },
      { name: 'Téléphone', prop: 'phone' },
      { prop: 'Qualifications' },
    ];
  }
}
