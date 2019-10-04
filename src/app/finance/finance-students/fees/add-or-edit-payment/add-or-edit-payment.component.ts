import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {Student} from '../../../../models/student';
import {SchoolYear} from '../../../../models/school-year';
import {FeeType} from '../../../../models/fee-type';
import {Classroom} from '../../../../models/classroom';
import {ClassroomsRepository} from '../../../../repositories/classrooms.repository';
import {StudentsRepository} from '../../../../repositories/students.repository';
import {filter, flatMap, map, switchMap} from 'rxjs/operators';
import {FeeTypesRepository} from '../../../../repositories/fee-types.repository';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Payment} from '../../../../models/payment';
import {Utils} from '../../../../shared/utils';
import {PaymentsRepository} from '../../../../repositories/payments.repository';

@Component({
  selector: 'app-add-or-edit-payment',
  templateUrl: './add-or-edit-payment.component.html',
  styleUrls: ['./add-or-edit-payment.component.scss']
})
export class AddOrEditPaymentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private formBuilder: FormBuilder,
              public classroomsRepository: ClassroomsRepository,
              private studentsRepository: StudentsRepository,
              public feeTypesRepository: FeeTypesRepository,
              public dialogRef: MatDialogRef<AddOrEditPaymentComponent>,
              private utils: Utils,
              private paymentsRepository: PaymentsRepository) {
    this.payment = this.data.payment;
    if (this.payment) {
      this.paymentForm.patchValue(this.payment);
      this.title = 'Modification du payement';
    }
  }

  payment: Payment;
  title = 'Nouveau payement';
  classroomSelected = new FormControl();
  students: Student[];
  studentsFiltred: Student[];
  paymentForm = this.formBuilder.group({
    _id: [],
    student: [],
    schoolYear: [],
    registrationFee: [],
    schoolFee: [],
    classroom: [],
    amount: [0]
  });

  save() {
    if (this.paymentForm.valid) {
      this.payment ? this.edit() : this.create();
      this.utils.common.toast(`Opération réalisée avec succès`);
      this.dialogRef.close();
    } else {
      this.utils.common.alert('Il existe des erreurs dans le formulaire');
    }
  }

  async create() {
    const payment = this.paymentForm.value;
    await this.paymentsRepository.add(payment);
  }

  async edit() {
    const payment = this.paymentForm.value;
    await this.paymentsRepository.update(payment, this.payment._id);
  }

  ngOnInit() {
    this.classroomSelected.valueChanges
      .subscribe((classroom: Classroom) => {
        this.studentsFiltred = this.students.filter(s => s.classroom._id === classroom._id);
      });

    this.studentsRepository.stream
      .subscribe((students: Student[]) => {
        this.students = students;
      });
  }
}
