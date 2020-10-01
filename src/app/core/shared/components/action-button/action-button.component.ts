import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WorkService} from '../../../services/work.service';
import {Services} from '../../../services/services';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {

  isBusy: boolean;
  @Input() text: string;
  @Input() color: string;
  @Input() type: string;

  @Output() appClick = new EventEmitter();

  constructor(private services: Services) { }

  onClick() {
    this.appClick.emit();
  }

  ngOnInit() {
    this.services.smallWork.isBusy.subscribe(v => this.isBusy = v);
  }

}
