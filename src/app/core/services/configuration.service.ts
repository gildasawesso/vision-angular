import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private isAdminConfiguredBehaviorSubject = new BehaviorSubject(false);
  private isSchoolConfiguredBehaviorSubject = new BehaviorSubject(false);
  private isSchoolSessionsConfiguredBehaviorSubject = new BehaviorSubject(false);

  get isAdminConfigured() {
    return this.isAdminConfiguredBehaviorSubject.value;
  }

  set isAdminConfigured(value: boolean) {
    this.isAdminConfiguredBehaviorSubject.next(value);
  }

  get isSchoolConfigured() {
    return this.isSchoolConfiguredBehaviorSubject.value;
  }

  set isSchoolConfigured(value: boolean) {
    this.isSchoolConfiguredBehaviorSubject.next(value);
  }

  get isSchoolSessionsConfigured() {
    return this.isSchoolSessionsConfiguredBehaviorSubject.value;
  }

  set isSchoolSessionsConfigured(value: boolean) {
    this.isSchoolSessionsConfiguredBehaviorSubject.next(value);
  }

  constructor() { }
}
