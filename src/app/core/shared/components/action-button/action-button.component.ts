import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {

  @Input() isBusy: boolean;
  @Input() text: string;
  @Input() color: string;
  @Input() type: string;

  @Output() appClick = new EventEmitter();

  constructor() { }

  onClick() {
    this.appClick.emit();
  }

  ngOnInit() {
  }

}
