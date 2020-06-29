import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spaced'
})
export class SpacedPipe implements PipeTransform {

  transform(value: number, ...args: any[]): any {
    if (value === undefined || value == null ) { return value; }
    const suffix = args[0] ? ' ' + args[0] :  '';
    return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + suffix;
  }
}
