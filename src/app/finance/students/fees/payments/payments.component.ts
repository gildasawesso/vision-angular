import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PaymentsRepository} from '../../../../core/repositories/payments.repository';
import {Payment} from '../../../../core/models/payment';
import {Utils} from '../../../../core/shared/utils';
import {EditPaymentComponent} from '../edit-payment/edit-payment.component';
import {constants} from '../../../../core/constants';
import {Classroom} from '../../../../core/models/classroom';
import {ClassroomsRepository} from '../../../../core/repositories/classrooms.repository';
import {FormControl} from '@angular/forms';
import {RegistrationsRepository} from '../../../../core/repositories/registrations.repository';
import {Registration} from '../../../../core/models/registration';
import {Student} from '../../../../core/models/student';
import {AddPaymentComponent} from '../add-payment/add-payment.component';
import * as moment from 'moment';

@Component({
  selector: 'app-scholarships',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  rows: any[];
  columns: any[];

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
  filterStartDate = new FormControl(this.startDateFiltering);
  filterEndDate = new FormControl(this.endDateFiltering);
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
      payments = payments.filter(p => p.classroom._id === this.classroomSelected.value._id);
    }

    if (this.studentSelected.value != null) {
      payments = payments.filter(p => p.student._id === this.studentSelected.value._id);
    }

    if (this.filterStartDate.value != null) {
      payments = payments.filter(p => {
        const paymentDate = moment(p.paymentDate);
        const filterStartDate = moment(this.filterStartDate.value);
        return paymentDate.isAfter(filterStartDate);
      });
    }

    if (this.filterEndDate.value != null) {
      payments = payments.filter(p => {
        const paymentDate = moment(p.paymentDate);
        const filterEndDate = moment(this.filterEndDate.value);
        return paymentDate.isBefore(filterEndDate);
      });
    }
    console.log(payments);
    this.rows = [...payments];
  }

  async add() {
    await this.utils.common.modal(AddPaymentComponent, { payment: null });
  }

  async edit(payment: Payment) {
    await this.utils.common.modal(EditPaymentComponent, { payment });
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

  reset() {
    this.classroomSelected.patchValue(null, {emitEvent: false});
    this.studentSelected.patchValue(null, {emitEvent: false});
    this.filterStartDate.patchValue(this.startOfTheWeek, {emitEvent: false});
    this.filterEndDate.patchValue(this.endOfTheWeek, {emitEvent: false});
    this.refreshList();
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
              this.filterStartDate.patchValue(this.startOfTheWeek, {emitEvent: false});
              this.filterEndDate.patchValue(this.endOfTheWeek, {emitEvent: false});
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
      .subscribe((classroom: Classroom) => {
        this.students = this.utils.student.classroomStudents(classroom);
        this.studentSelected.patchValue(null, {emitEvent: false});
        this.refreshList();
      });

    this.studentSelected.valueChanges
      .subscribe((student: Student) => {
        this.refreshList();
      });

    this.filterStartDate.valueChanges.subscribe(date => {
      this.startDateFiltering = date.format();
      this.refreshList();
    });
    this.filterEndDate.valueChanges.subscribe(date =>  {
      this.endDateFiltering = date.format();
      this.refreshList();
    });

    this.columns = [
      { prop: 'paymentDate', name: 'Date de payement', pipe: { transform: this.utils.common.formatDate} },
      { name: 'Nom', cellTemplate: this.studentFullNameTemplate },
      { name: 'Class', cellTemplate: this.classroomTemplate },
      { name: 'Contributions', cellTemplate: this.feesTemplate },
      { prop: 'amount', name: 'Montant', pipe: { transform: this.utils.common.spaced } },
      { name: 'Options', cellTemplate: this.actionsTemplate }
    ];
  }
}
