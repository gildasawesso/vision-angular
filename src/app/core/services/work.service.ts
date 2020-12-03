import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  working = new BehaviorSubject({ state: false, text: ''});

  started(message: string) {
    this.working.next({ state: true, text: message});
  }

  ended() {
    this.working.next({ state: false, text: ''});
  }
}
