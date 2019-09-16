import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {

  @Input() isBusy: boolean;
  @Input() isReady: boolean;
  @Input() text: string;
  @Input() color: string;

  constructor() { }

  ngOnInit() {
  }

}
