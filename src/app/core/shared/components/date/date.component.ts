import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DateComponent implements OnInit {

  @Input() label: string;
  @Input() control: AbstractControl;
  @Input() view = 'year';

  constructor() { }

  ngOnInit() {
  }

}
