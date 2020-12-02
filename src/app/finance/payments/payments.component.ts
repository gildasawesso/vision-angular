import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PaymentsRepository} from '../../core/repositories/payments.repository';
import {Payment} from '../../core/models/payment';
import {Utils} from '../../core/shared/utils';
import {EditPaymentComponent} from './edit-payment/edit-payment.component';
import {constants} from '../../core/constants';
import {Classroom} from '../../core/models/classroom';
import {ClassroomsRepository} from '../../core/repositories/classrooms.repository';
import {FormControl} from '@angular/forms';
import {RegistrationsRepository} from '../../core/repositories/registrations.repository';
import {Registration} from '../../core/models/registration';
import {Student} from '../../core/models/student';
import {AddPaymentComponent} from './add-payment/add-payment.component';
import * as moment from 'moment';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {StudentChooserComponent} from '../../core/shared/components/student-chooser/student-chooser.component';
import {Repositories} from '../../core/repositories/repositories';
import {PayComponent} from '../pay/pay.component';
import {EditPayComponent} from '../edit-pay/edit-pay.component';

@Component({
  selector: 'app-scholarships',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  rows: any[];
  columns: any[];
  totalPayments: number;

  ranges: any = [{
    value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()],
    label: 'Derniers 7 jours'
  }
  ];

  datePickerConfg: Partial<BsDatepickerConfig> = {
    rangeInputFormat: 'DD MMM YYYY',
    ranges: this.ranges
  };

  get startDateFiltering() {
    return localStorage.getItem('filteringStartDate');
  }

  set startDateFiltering(date) {
     localStorage.setItem('filteringStartDate', date);
  }

  get endDateFiltering() {
    return localStorage.getItem('filteringEndDate');
  }

  set endDateFiltering(date) {
    localStorage.setItem('filteringEndDate', date);
  }

  constructor(public paymentRepository: PaymentsRepository,
              private repo: Repositories,
              public utils: Utils,
              private changeDetector: ChangeDetectorRef,
              private classroomsRepository: ClassroomsRepository,
              private registrationsRepository: RegistrationsRepository) {
  }

  @ViewChild('studentFullName', {static: true}) studentFullNameTemplate: TemplateRef<any>;
  @ViewChild('classroom', {static: true}) classroomTemplate: TemplateRef<any>;
  @ViewChild('fees', {static: true}) feesTemplate: TemplateRef<any>;
  @ViewChild('actions', {static: true}) actionsTemplate: TemplateRef<any>;

  classroomSelected = new FormControl(null);
  studentSelected = new FormControl(null);
  filterDate = new FormControl([
    new Date(this.startDateFiltering),
    new Date(this.endDateFiltering)
  ]);
  startOfTheWeek = null;
  endOfTheWeek = null;

  students: Student[] = [];
  classrooms: Classroom[] = [];
  registrations: Registration[] = [];
  registrationsFiltred: Registration[] = [];
  payments: Payment[] = [];
  mapping = {
    paymentDate: 'Date de payement',
    'array fees fee.name': 'Type de contribution',
    amount: 'Montant',
    options: 'Options',
  };
  optionsPermissions = { edit: constants.permissions.editPayment, delete: constants.permissions.deletePayment };

  refreshList() {
    let payments = [...this.payments];
    payments = payments.filter(p => p.student != null);

    if (this.classroomSelected.value != null) {
      payments = payments.filter(p => p.classroom === this.classroomSelected.value);
    }

    if (this.studentSelected.value != null) {
      payments = payments.filter(p => p.student === this.studentSelected.value);
    }

    if (this.filterDate.value[0] != null || this.filterDate.value[0] !== undefined) {
      payments = payments.filter(p => {
        const paymentDate = moment(p.paymentDate);
        const filterStartDate = moment(this.filterDate.value[0]);
        return paymentDate.isSameOrAfter(filterStartDate, 'day');
      });
    }

    if (this.filterDate.value[1] != null || this.filterDate.value[1] !== undefined) {
      payments = payments.filter(p => {
        const paymentDate = moment(p.paymentDate);
        const filterEndDate = moment(this.filterDate.value[1]);
        return paymentDate.isSameOrBefore(filterEndDate, 'day');
      });
    }
    this.totalPayments = payments.reduce((acc, cur) => acc + cur.amount, 0);

    this.rows = [...payments];
  }

  async add() {
    const registration: Registration = await this.utils.common.modal(StudentChooserComponent, null);
    const classroom: Classroom = await this.repo.classrooms.one(registration.classroom._id);
    const defaultFee = await this.repo.fees.one(classroom.schoolFee);

    await this.utils.common.modal(PayComponent, {
      defaultFee,
      registration
    });
  }

  async edit(payment: Payment) {
    const registration = await this.repo.registrations.student(payment.student);
    await this.utils.common.modal(EditPayComponent, {
      registration,
      payment,
    });
  }

  async delete(payment: Payment) {
    const result = await this.utils.common.customAlert('Confirmez-vous la suppression de ce payement ?', 'Attention', ['OUI', 'NON']);
    if (result === 0) {
      await this.paymentRepository.remove(payment._id);
      this.utils.common.toast('Le payment a été supprimé avec succès');
      this.changeDetector.detectChanges();
    }
  }

  async printReceipt(payment: Payment) {
    try {
      await this.utils.print.registrationReceipt(payment);
    } catch (e) {
      console.log(e);
      this.utils.common.alert(e, 'Une erreur est servenue');
    }
  }

  async formatDate(payment: Payment) {
    try {
      await this.utils.print.registrationReceipt(payment);
    } catch (e) {
      console.log(e);
      this.utils.common.alert(e, 'Une erreur est servenue');
    }
  }

  ngOnInit() {
    this.paymentRepository.stream
      .subscribe(payments => {
        this.payments = [...payments];

        if (this.startDateFiltering == null && this.endDateFiltering == null) {
          this.utils.common.serverTime()
            .then(serverTime => {
              this.startOfTheWeek = moment(serverTime).startOf('week');
              this.endOfTheWeek = moment(serverTime).endOf('week');
              this.filterDate.patchValue([this.startOfTheWeek, this.endOfTheWeek], {emitEvent: false});
              this.refreshList();
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.refreshList();
        }
      });

    this.classroomsRepository.stream
      .subscribe(classrooms => {
        this.classrooms = classrooms;
      });

    this.registrationsRepository.stream
      .subscribe(registrations => {
        this.registrations = registrations;
        this.registrationsFiltred = [...registrations];
      });

    this.classroomSelected.valueChanges
      .subscribe((classroomId: string) => {
        this.students = this.registrations
          .filter(r => r.classroom._id === classroomId)
          .map(r => r.student);
        this.studentSelected.patchValue(null, {emitEvent: false});
        this.refreshList();
      });

    this.studentSelected.valueChanges
      .subscribe((student: Student) => {
        this.refreshList();
      });

    this.filterDate.valueChanges.subscribe(dates => {
      const start = moment(dates[0]);
      const end = moment(dates[1]);
      this.startDateFiltering = start.format();
      this.endDateFiltering = end.format();
      this.refreshList();
    });

    this.columns = [
      { prop: 'paymentDate', name: 'Date de payement', pipe: { transform: this.utils.common.formatDate} },
      { name: 'Nom', cellTemplate: this.studentFullNameTemplate },
      { name: 'Class', cellTemplate: this.classroomTemplate },
      { prop: 'amount', name: 'Montant', pipe: { transform: this.utils.common.spaced } },
      { name: 'Options', cellTemplate: this.actionsTemplate }
    ];
  }
}
