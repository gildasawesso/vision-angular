import {Component, forwardRef, Input} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Utils} from '../../utils';

@Component({
  selector: 'app-advanced-select',
  templateUrl: './advanced-select.component.html',
  styleUrls: ['./advanced-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdvancedSelectComponent),
      multi: true
    }
  ]
})
export class AdvancedSelectComponent implements ControlValueAccessor {

  @Input() options: any[];
  @Input() valueKey: string;
  @Input() displayKey: string;
  @Input() multiple = false;
  @Input() addEmptyOption = false;
  @Input() emptyLabel = 'Veuillez sélectionner une valeur';
  @Input() control: AbstractControl;

  constructor(public utils: Utils) { }

  registerOnChange(fn: (_: any) => void): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
  }
}
