import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Classroom} from '../../core/models/classroom';
import {ClassroomsRepository} from '../../core/repositories/classrooms.repository';
import {Utils} from '../../core/shared/utils';
import {AddOrEditClassroomComponent} from './add-or-edit-classroom/add-or-edit-classroom.component';
import {Repositories} from '../../core/repositories/repositories';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassroomsComponent implements OnInit, AfterViewInit {

  classrooms: Classroom[];
  columns = [];

  @ViewChild('registrationFee', {static: true}) registrationFeeTemplate: TemplateRef<any>;
  @ViewChild('reRegistrationFee', {static: true}) reRegistrationFeeTemplate: TemplateRef<any>;
  @ViewChild('schoolFee', {static: true}) schoolFeeTemplate: TemplateRef<any>;

  constructor(public classroomRepository: ClassroomsRepository,
              private changeDetector: ChangeDetectorRef,
              private repo: Repositories,
              private utils: Utils) {
  }

  add() {
    this.utils.common.modal(AddOrEditClassroomComponent, null);
  }

  edit(classroom: Classroom) {
    this.utils.common.modal(AddOrEditClassroomComponent, { classroomId: classroom._id });
  }

  async delete(classroom: Classroom) {
    await this.repo.classrooms.remove(classroom._id);
  }

  ngOnInit() {
    this.repo.classrooms.stream.subscribe(classrooms => {
      this.classrooms = [...classrooms];
      this.changeDetector.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.columns = [
      { name: 'Nom', prop: 'name' },
      { name: `Frais d'inscription`, cellTemplate: this.registrationFeeTemplate },
      { name: `Frais de réinscription`, cellTemplate: this.reRegistrationFeeTemplate },
      { name: `Frais de sclarité`, cellTemplate: this.schoolFeeTemplate },
    ];
  }
}
