import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Utils} from '../../utils';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {

  @Input() label: string;
  @Input() options: any[];
  @Input() valueKey: string;
  @Input() displayKey: string;
  @Input() multiple = false;
  @Input() addEmptyOption = false;
  @Input() emptyLabel = 'Veuillez sélectionner une valeur';
  @Input() control: AbstractControl;

  // tslint:disable-next-line:variable-name
  @Input('value') _value: any = null;
  @Input('type') type = 'text';
  propagateChange: (_: any) => void;
  onTouched: any;
  disabled: boolean;

  constructor(public utils: Utils) { }

  get value() {
    return this._value;
  }

  set value(val) {
    if (val) {
      this._value = val;
      if (this.propagateChange) { this.propagateChange(this._value); }
      if (this.onTouched) { this.onTouched(); }
    }
  }

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
