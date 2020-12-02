import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SpacedPipe} from '../../../core/shared/pipes/spaced.pipe';

@Component({
  selector: 'app-registration-state',
  templateUrl: './registration-state.component.html',
  styleUrls: ['./registration-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationStateComponent implements OnInit, OnChanges {

  @Input() state;
  @Input() hideReduLabel: false;

  max: number;
  stack = [];

  constructor(private spaced: SpacedPipe) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.max = this.state.registrationFeeAmount;
    const type = this.state.registrationFeeToPay !== this.state.registrationFeePayed ? 'warning' : 'success';
    let label = this.spaced.transform(this.state.registrationFeePayed, 'F');
    if (this.max === 0) label = null;

    if (this.hideReduLabel) {
      this.stack = [
        { value: this.state.registrationFeePayed, type, label  },
        { value : this.state.registrationFeeReduction, type: 'danger'}
      ];
    } else {
      this.stack = [
        { value: this.state.registrationFeePayed, type, label },
        { value : this.state.registrationFeeReduction, type: 'danger', label: this.spaced.transform(this.state.registrationFeeReduction, 'F')}
      ];
    }
  }
}
