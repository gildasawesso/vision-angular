import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Registration} from '../../../models/registration';
import {RegisterComponent} from '../../../../registration/re-registration/register/register.component';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {fromEvent} from 'rxjs';
import {Utils} from '../../utils';
import {Repositories} from '../../../repositories/repositories';
import {MatDialogRef} from '@angular/material/dialog';
import {Classroom} from '../../../models/classroom';
import {FormControl, Validators} from '@angular/forms';
import {Student} from '../../../models/student';

@Component({
  selector: 'app-student-chooser',
  templateUrl: './student-chooser.component.html',
  styleUrls: ['./student-chooser.component.scss']
})
export class StudentChooserComponent implements OnInit {

  classrooms: Classroom[];
  registrations: Registration[];
  registrationsFiltered: Registration[];

  classroomSelected = new FormControl(null, Validators.required);
  studentSelected = new FormControl(null, Validators.required);

  @ViewChild('searchStudent', {static: true}) registrationSearch: ElementRef;

  constructor(private repo: Repositories,
              public utils: Utils,
              public dialogRef: MatDialogRef<StudentChooserComponent>) {
  }

  async choose() {
    if (this.utils.form.isValid(this.studentSelected) && this.utils.form.isValid(this.classroomSelected)) {
      this.dialogRef.close(this.studentSelected.value);
    }
  }

  trackBy(index, item) {
    if (item == null) {
      console.log(index);
    }
    return item._id;
  }

  sortRegistrations(r1: Registration, r2: Registration) {
    if (r1.student.lastname > r2.student.lastname) {
      return 1;
    } else if (r1.student.lastname < r2.student.lastname) {
      return -1;
    } else {
      return 0;
    }
  }

  ngOnInit() {
    this.repo.registrations.stream.subscribe(registrations => this.registrations = registrations.sort(this.sortRegistrations));
    this.repo.classrooms.stream.subscribe(c => this.classrooms = c);

    this.classroomSelected.valueChanges.subscribe(classroom => {
      this.registrationsFiltered = this.registrations.filter(r => r.classroom._id === classroom._id);
    });
  }
}
