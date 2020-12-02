import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() head1: string;
  @Input() head2: string;

  constructor() { }

  ngOnInit(): void {
  }

}
