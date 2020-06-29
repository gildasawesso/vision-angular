import {Directive, Input, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[chartHost]'
})
export class ChartHostDirective {

  @Input('chartHost') component: any;

  constructor(public viewContainer: ViewContainerRef) { }

}
