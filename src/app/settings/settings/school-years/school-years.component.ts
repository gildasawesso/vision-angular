import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SchoolyearsRepository} from '../../../core/repositories/schoolyears.repository';
import {SchoolYear} from '../../../core/models/school-year';
import {Observable} from 'rxjs';
import {TableColumn} from '@swimlane/ngx-datatable';
import {Utils} from '../../../core/shared/utils';
import {AddOrEditSchoolYearComponent} from './add-or-edit-school-year/add-or-edit-school-year.component';

@Component({
  selector: 'app-school-years',
  templateUrl: './school-years.component.html',
  styleUrls: ['./school-years.component.scss']
})
export class SchoolYearsComponent implements OnInit {

  schoolYears: Observable<SchoolYear[]>;
  columns: TableColumn[] = [];
  showOptions = false;

  constructor(private schoolyearsRepository: SchoolyearsRepository,
              private utils: Utils) {
  }

  async add() {
    const data = await this.utils.common.modal(AddOrEditSchoolYearComponent, null);
    console.log(data);
  }

  async edit(schoolYear: SchoolYear) {
    await this.utils.common.modal(AddOrEditSchoolYearComponent, schoolYear);
  }

  async remove(schoolYear: SchoolYear) {
    await this.schoolyearsRepository.remove(schoolYear._id);
  }

  ngOnInit() {
    this.schoolYears = this.schoolyearsRepository.stream;

    this.columns = [
      {prop: 'startDate', name: `Début`, pipe: {transform: this.utils.common.formatDate}},
      {prop: 'endDate', name: `Fin`, pipe: {transform: this.utils.common.formatDate}},
    ];
  }

}
