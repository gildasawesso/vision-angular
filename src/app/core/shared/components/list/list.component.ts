import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() items;
  @Input() displayKey;
  @Input() displayAll = false;

  @Output() onClicked = new EventEmitter();

  selected = -1;

  constructor() { }

  itemSelected(item: any, index: number) {
    this.selected = index;
    this.onClicked.emit(item);
  }

  ngOnInit() {
  }

}
