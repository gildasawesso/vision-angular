import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-or-edit-spend',
  templateUrl: './add-or-edit-spend.component.html',
  styleUrls: ['./add-or-edit-spend.component.scss']
})
export class AddOrEditSpendComponent implements OnInit {

  amount = new FormControl();

  constructor() { }

  ngOnInit() {
  }

}
