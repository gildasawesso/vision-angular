import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Utils} from '../../core/shared/utils';
import {SubjectsRepository} from '../../core/repositories/subjects.repository';
import {Subject} from '../../core/models/subject';
import {AddOrEditSubjectComponent} from './add-or-edit-subject/add-or-edit-subject.component';
import {constants} from '../../core/constants';
import {Repositories} from '../../core/repositories/repositories';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-courses-list',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectsComponent implements OnInit, AfterViewInit {

  subjects: Subject[];

  constructor(private utils: Utils,
              private repo: Repositories,
              private changeDetector: ChangeDetectorRef,
              public subjectsRepository: SubjectsRepository) { }

  columns = [
    { name: 'Nom', prop: 'name' },
    { name: 'Code', prop: 'code' },
  ];

  async add() {
    await this.utils.common.modal(AddOrEditSubjectComponent, { subjectId: null });
  }

  async edit(subject: Subject) {
    await this.utils.common.modal(AddOrEditSubjectComponent, { subjectId: subject._id });
  }

  async delete(subject: Subject) {
    await this.repo.subjects.remove(subject._id);
  }

  ngOnInit() {
    this.repo.subjects.stream.subscribe(subjects => {
      this.subjects = [...subjects];
      this.changeDetector.detectChanges();
    });
  }

  ngAfterViewInit() {

  }

}
