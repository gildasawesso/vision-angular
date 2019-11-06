import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PaymentsRepository} from '../../../../core/repositories/payments.repository';
import {Payment} from '../../../../core/models/payment';
import {Utils} from '../../../../core/shared/utils';
import {AddOrEditPaymentComponent} from '../add-or-edit-payment/add-or-edit-payment.component';
import {constants} from '../../../../core/constants';

@Component({
  selector: 'app-scholarships',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor(public paymentRepository: PaymentsRepository,
              private utils: Utils,
              private changeDetector: ChangeDetectorRef) {
  }

  data = [];
  mapping = {
    'append student.firstname student.lastname': 'Nom de l\'élève',
    'classroom.name': 'Classe',
    'date createdAt': 'Date de payement',
    'array fees fee.name': 'Type de contribution',
    amount: 'Montant',
    options: 'Options',
  };
  optionsPermissions = { edit: constants.permissions.editPayment, delete: constants.permissions.deletePayment };

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
        this.data = [...payments];
      });
  }

}
