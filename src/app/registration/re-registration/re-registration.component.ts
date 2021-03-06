import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {StudentsRepository} from '../../core/repositories/students.repository';
import {Utils} from '../../core/shared/utils';
import {RegisterComponent} from './register/register.component';
import {RegistrationsRepository} from '../../core/repositories/registrations.repository';
import {Registration} from '../../core/models/registration';

@Component({
  selector: 'app-other-registration',
  templateUrl: './re-registration.component.html',
  styleUrls: ['./re-registration.component.scss']
})
export class ReRegistrationComponent implements OnInit {

  focused = false;
  registrationsFiltered: Registration[];
  lastYearRegistrations: Registration[];
  currentYearRegistrations: any;

  @ViewChild('searchStudent', {static: true}) registrationSearch: ElementRef;

  constructor(private studentsRepository: StudentsRepository,
              private registrationsRepository: RegistrationsRepository,
              private utils: Utils) {
  }

  async register(registration: Registration) {
    await this.utils.common.modal(RegisterComponent, registration);
    this.registrationsFiltered = [];
    this.registrationSearch.nativeElement.value = '';
  }

  trackBy(index, item) {
    if (item == null) {
      console.log(index);
    }
    return item._id;
  }

  ngOnInit() {
    this.registrationsRepository.lastYearRegisrations.subscribe(registrations => {
      this.lastYearRegistrations = null;
      this.lastYearRegistrations = registrations;
    });
    this.registrationsRepository.stream
      .pipe(
        map(registrations => {
          return registrations.map(r => [r.student._id, r]);
        }),
        map((entries: any) => Object.fromEntries(entries))
      )
      .subscribe(r => {
        this.currentYearRegistrations = r;
      });

    fromEvent(this.registrationSearch.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe(value => {
        if (!this.lastYearRegistrations) {
          return;
        }

        if (value === '') {
          this.registrationsFiltered = [];
          return;
        }
        this.registrationsFiltered = this.lastYearRegistrations.filter(regisration => {
          const fields = `${regisration.student.firstname}${regisration.student.lastname}${regisration.student.lastname}${regisration.student.firstname}`;
          return fields.trim().toLowerCase().indexOf(value.trim().toLowerCase()) >= 0;
        });
      });
  }
}
