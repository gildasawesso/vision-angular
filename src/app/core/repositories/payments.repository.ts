import { Injectable } from '@angular/core';
import {BaseRepository} from './base.repository';
import {Payment} from '../models/payment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsRepository extends BaseRepository<Payment> {

  public classroomsPayments: BehaviorSubject<unknown> = new BehaviorSubject<unknown>(null);
  public state: BehaviorSubject<unknown> = new BehaviorSubject<unknown>(null);

  constructor() {
    super('/payments');
  }

  async studentPayments(studentId: string) {
    return this.query.get(`/student/${studentId}`);
  }

  async studentFeePayments(studentId: string, feeId: string) {
    return this.query.get(`/student/${studentId}/fee/${feeId}`);
  }

  async init() {
    await super.init();
    this.stream.subscribe(async _ => {
      await this.getClassroomPayments();
      await this.getPaymentsState();
    });
  }

  private async getClassroomPayments() {
    const payments = await this.query.get(`/classrooms`);
    this.classroomsPayments.next(payments);
  }

  private async getPaymentsState() {
    const state = await this.query.get(`/classrooms/state`);
    this.state.next(state);
  }
}
