import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder = '';
  @Input() name: string;
  // tslint:disable-next-line:variable-name
  @Input('value') _value = '';
  @Input('type') type = 'text';
  propagateChange: (_: any) => void;
  onTouched: any;
  disabled: boolean;


  get value() {
    return this._value;
  }

  set value(val) {
    if (val) {
      this._value = val;
      if (this.propagateChange) { this.propagateChange(this._value); }
      if (this.onTouched) { this.onTouched(); }
    } else {
      this._value = '';
      if (this.propagateChange) { this.propagateChange(''); }
      if (this.onTouched) { this.onTouched(); }
    }
  }

  constructor() { }

  registerOnChange(fn: (_: any) => void): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.value = obj;
    }
  }

  ngOnInit() {
  }

}
