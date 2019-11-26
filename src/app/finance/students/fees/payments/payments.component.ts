import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PaymentsRepository} from '../../../../core/repositories/payments.repository';
import {Payment} from '../../../../core/models/payment';
import {Utils} from '../../../../core/shared/utils';
import {AddOrEditPaymentComponent} from '../add-or-edit-payment/add-or-edit-payment.component';
import {constants} from '../../../../core/constants';
import {Classroom} from '../../../../core/models/classroom';
import {ClassroomsRepository} from '../../../../core/repositories/classrooms.repository';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-scholarships',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor(public paymentRepository: PaymentsRepository,
              private utils: Utils,
              private changeDetector: ChangeDetectorRef,
              private classroomsRepository: ClassroomsRepository) {
  }

  classroomSelected = new FormControl('');
  classroomSelectedIndex = -1;
  classrooms: Classroom[] = [];
  payments: Payment[] = [];
  paymentsFiltred: Payment[] = [];
  mapping = {
    'append student.firstname student.lastname': 'Nom de l\'élève',
    'classroom.name': 'Classe',
    paymentDate: 'Date de payement',
    'array fees fee.name': 'Type de contribution',
    amount: 'Montant',
    options: 'Options',
  };
  optionsPermissions = { edit: constants.permissions.editPayment, delete: constants.permissions.deletePayment };

  selectClassroom(classroom: Classroom, index) {
    this.classroomSelected.patchValue(classroom);
    this.classroomSelectedIndex = index;

    this.refreshList();
  }

  refreshList() {
    let payments = [...this.payments];
    if (this.classroomSelected.value !== null || this.classroomSelected.value !== '') {
      payments = payments.filter(p => p.classroom._id == null);
      console.log(payments);
    }
    this.paymentsFiltred = payments;
  }

  async add() {
    await this.utils.common.modal(AddOrEditPaymentComponent, { payment: null });
  }

  async edit(payment: Payment) {
    await this.utils.common.modal(AddOrEditPaymentComponent, { payment });
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
      console.log(payment);
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
      });

    this.classroomsRepository.stream
      .subscribe(classrooms => {
        this.classrooms = classrooms;
      });
  }

}
