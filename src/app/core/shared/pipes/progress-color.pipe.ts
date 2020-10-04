import { Pipe, PipeTransform } from '@angular/core';
import {ProgressbarType} from 'ngx-bootstrap/progressbar';

@Pipe({
  name: 'progressColor'
})
export class ProgressColorPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): ProgressbarType {
    const max = args[0];
    if (value < max) {
      return 'warning';
    } else if (value === 0) {
      return 'danger';
    } else {
      return 'success';
    }
  }

}
