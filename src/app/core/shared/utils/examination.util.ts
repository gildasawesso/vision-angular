import {Injectable} from '@angular/core';
import {Payment} from '../../models/payment';
import {FeeType} from '../../models/fee-type';
import {Student} from '../../models/student';
import {Registration} from '../../models/registration';
import {ExaminationsRepository} from '../../repositories/examinations.repository';
import {Examination} from '../../models/examination';
import {Classroom} from '../../models/classroom';
import {ExaminationType} from '../../models/examination-type';

@Injectable()
export class ExaminationUtil {

  examinations: Examination[] = [];

  classroomExaminations(classroom: Classroom) {
    return this.examinations.filter(e => e.classroom._id === classroom._id);
  }

  classroomExaminationTypes(classroom: Classroom) {
    const examinationTypes: ExaminationType[] = [];
    this.examinations.forEach(examination => {
      if (!this.examinationTypeAlreadyAdded(examination, examinationTypes)) {
        examinationTypes.push(examination.type);
      }
    });
    return examinationTypes;
  }

  private examinationTypeAlreadyAdded(examination: Examination, examinationTypes: ExaminationType[]) {
    return examinationTypes.find(et => et._id === examination.type._id) !== undefined;
  }

}
