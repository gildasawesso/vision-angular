import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {ColumnMode, SortType} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatableComponent implements OnInit, OnChanges {

  @Input() rows;
  @Input() columns;
  @Input() loading;
  @Input() hideOptions = false;
  @Input() count = 0;

  @Output() edit = new EventEmitter();
  @Output() remove = new EventEmitter();

  sortType = SortType;
  columnMode = ColumnMode;

  @ViewChild('actionsTemplate', {static: true}) optionsTemplate: TemplateRef<any>;

  constructor() {
  }

  onEdit(item: any) {
    this.edit.emit(item);
  }

  onRemove(item: any) {
    this.remove.emit(item);
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[`columns`]) {
      if (!this.hideOptions) {
        if (this.columns.find(c => c[`name`] === 'Options') === undefined) {
          this.columns.push({name: 'Options', cellTemplate: this.optionsTemplate});
        }
      }
    }
  }
}
