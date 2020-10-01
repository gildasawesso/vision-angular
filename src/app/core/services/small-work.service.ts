import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmallWorkService {

  isBusy = new BehaviorSubject(false);

  started() {
   this.isBusy.next(true);
  }

  finished() {
    this.isBusy.next(false);
  }
}
