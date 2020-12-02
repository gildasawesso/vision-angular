import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {StudentsRepository} from '../../core/repositories/students.repository';
import {ClassroomsRepository} from '../../core/repositories/classrooms.repository';
import {FormControl} from '@angular/forms';
import {Classroom} from '../../core/models/classroom';
import {Student} from '../../core/models/student';
import {Utils} from '../../core/shared/utils';
import {EditStudentComponent} from './edit-student/edit-student.component';
import {RegistrationsRepository} from '../../core/repositories/registrations.repository';
import {Repositories} from '../../core/repositories/repositories';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Registration} from '../../core/models/registration';

@Component({
  selector: 'app-students-list',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsComponent implements OnInit, AfterViewInit {

  students: Student[];
  classrooms: Classroom[];
  filteredStudents: Student[] = [];
  columns: unknown[] = [];
  classroomSelected = new FormControl(null);
  searchTerm = new FormControl('');

  @ViewChild('studentFullName', {static: true}) studentFullNameTemplate: TemplateRef<any>;
  @ViewChild('searchInput', {static: true}) searchTemplate: ElementRef<any>;

  constructor(public studentsRepository: StudentsRepository,
              public classroomsRepository: ClassroomsRepository,
              private registrationsRepository: RegistrationsRepository,
              private repo: Repositories,
              private changeDetector: ChangeDetectorRef,
              public utils: Utils) {
  }

  filter() {
    if (this.classroomSelected.value == null) {
      this.filteredStudents = [...this.students].sort(this.utils.student.sortFn);
    } else {
      this.filteredStudents = this.students.filter(student => student.classroomId === this.classroomSelected.value).sort(this.utils.student.sortFn);
    }
    this.changeDetector.detectChanges();
  }

  search() {
    const value = this.searchTerm.value;
    this.filter();
    this.filteredStudents = this.filteredStudents.filter(student => `${student.lastname}${student.firstname}`.toLowerCase().indexOf(value?.toLowerCase()) >= 0);
    this.changeDetector.detectChanges();
  }

  async edit(student: Student) {
    await this.utils.common.modal(EditStudentComponent, { studentId: student._id }, true);
    this.registrationsRepository.sync();
  }

  async delete(student: Student) {
    const registration: Registration = await this.repo.registrations.student(student._id);
    await this.repo.registrations.remove(registration._id);
    this.repo.students.sync();
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
    this.repo.students.stream.subscribe(students => {
      this.students = [...students];
      this.filteredStudents = [...students].sort(this.utils.student.sortFn);
      this.changeDetector.detectChanges();
    });

    this.repo.classrooms.stream.subscribe(classrooms => {
      this.classrooms = classrooms;
      this.changeDetector.detectChanges();
    });

    this.classroomSelected.valueChanges.subscribe(classroom => {
      if (classroom === null) {
        this.filteredStudents = [...this.students].sort(this.utils.student.sortFn);
      } else {
        this.filter();
      }
    });
  }

  ngAfterViewInit() {
    this.columns = [
      { name: 'Nom', cellTemplate: this.studentFullNameTemplate },
      { name: 'Matricule', prop: 'matricule' },
      { name: 'Sexe', prop: 'gender' },
    ];

    fromEvent(this.searchTemplate.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(400),
      distinctUntilChanged(),
    ).subscribe(value => {
      if (value === '') {
        this.filter();
      } else {
        this.search();
      }
    });
  }
}
