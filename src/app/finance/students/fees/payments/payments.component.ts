import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-scholarships',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  get classroomStudents() {
    return this.registrations.filter(r => r.classroom._id === this.classroomSelected.value._id).map(r => r.student);
  }

  constructor(public paymentRepository: PaymentsRepository,
              private utils: Utils,
              private changeDetector: ChangeDetectorRef,
              private classroomsRepository: ClassroomsRepository,
              private registrationsRepository: RegistrationsRepository) {
  }

  classroomSelected = new FormControl('');
  studentSelected = new FormControl('');
  classroomSelectedIndex = -1;
  studentSelectedIndex = -1;
  classrooms: Classroom[] = [];
  registrations: Registration[] = [];
  registrationsFiltred: Registration[] = [];
  payments: Payment[] = [];
  paymentsFiltred: Payment[] = [];
  mapping = {
    paymentDate: 'Date de payement',
    'array fees fee.name': 'Type de contribution',
    amount: 'Montant',
    options: 'Options',
  };
  optionsPermissions = { edit: constants.permissions.editPayment, delete: constants.permissions.deletePayment };

  selectClassroom(classroom: Classroom, index) {
    this.classroomSelected.patchValue(classroom);
    this.classroomSelectedIndex = index;

    if (index !== -1) {
      this.studentSelectedIndex = -1;
    }

    this.refreshList();
  }

  selectStudent(student: Student, index) {
    this.studentSelected.patchValue(student);
    this.studentSelectedIndex = index;

    console.log(student);

    this.refreshList();
  }

  refreshList() {
    let payments = [...this.payments];
    payments = payments.filter(p => p.student != null);

    if (this.classroomSelectedIndex !== -1) {
      payments = payments.filter(p => p.classroom._id === this.classroomSelected.value._id);
    }

    if (this.studentSelectedIndex !== -1) {
      payments = payments.filter(p => p.student._id === this.studentSelected.value._id);
    }

    this.paymentsFiltred = payments;
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

  ngOnInit() {
    this.paymentRepository.stream
      .subscribe(payments => {
        this.payments = [...payments];
        this.paymentsFiltred = [...payments];
        this.refreshList();
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
  }

}
