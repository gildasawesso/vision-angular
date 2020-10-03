import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {formConstants} from '../../../constants/form.constants';
import {Utils} from '../../utils';

@Component({
  selector: 'app-new-input',
  templateUrl: './new-input.component.html',
  styleUrls: ['./new-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NewInputComponent),
      multi: true
    }
  ]
})
export class NewInputComponent implements OnInit, ControlValueAccessor {

  @Input() formControl: AbstractControl | any;
  @Input('type') type = 'text';
  focused: boolean;
  passwordMinimumLength = formConstants.passwordMinimumLength;

  constructor(public utils: Utils) { }

  registerOnChange(fn: (_: any) => void): void {}

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {}

  writeValue(obj: any): void {}

  ngOnInit() {
  }

}
