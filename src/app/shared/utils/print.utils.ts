import {Injectable} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {SchoolsRepository} from '../../repositories/schools.repository';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as moment from 'moment';
import {ApiService} from '../../services/api.service';
import {Payment} from '../../models/payment';

@Injectable()
export class PrintUtil {

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private schools: SchoolsRepository,
              private api: ApiService) {
  }

  spaced(value, suffix = '') {
    if (value === undefined || value == null ) { return value; }
    return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + suffix;
  }


  receipt(data: any) {
    console.log({school: this.schools.list[0], ...data});
    const win = window.open('', '_blank');
    pdfMake.createPdf(getReceiptDocDefinition(data)).open({}, win);
  }

  async registrationReceipt(payment: Payment | any) {
    const currentSchool = this.schools.list[0];
    const data = {
      code: payment.code,
      createdAt: moment(payment.createdAt).format('DD MMMM YYYY'),
      schoolYear: moment(payment.schoolYear.startDate).format('YYYY') + ' - ' + moment(payment.schoolYear.endDate).format('YYYY'),
      schoolName: currentSchool.nameLong,
      schoolAddress: currentSchool.zipCode,
      schoolPhones: currentSchool.phones.reduce((acc, current) => acc + ' ' + current, ''),
      schoolEmail: currentSchool.email,
      studentFullName: payment.student.firstname + ' ' + payment.student.lastname,
      studentAddress: payment.student.address,
      classroom: payment.classroom.name,
      fees: payment.fees.map((subPayement, index) => {
        return {
          designation: index !== 0 ? subPayement.fee.name : subPayement.fee.name + ' + ' + subPayement.fee.tranches[0].name,
          amount: index !== 0 ? this.spaced(subPayement.fee.amount) : this.spaced(subPayement.fee.amount + subPayement.fee.tranches[0].amount),
          payed: this.spaced(subPayement.amount),
          balance: this.spaced(subPayement.fee.amount - subPayement.amount),
        };
      }),
      totalAmount: this.spaced(payment.fees.reduce((acc, cur) => acc + cur.fee.amount, 0), 'FCFA'),
      totalPayed: this.spaced(payment.fees.reduce((acc, cur) => acc + cur.amount, 0), 'FCFA'),
      totalBalance: this.spaced(payment.fees.reduce((acc, cur) => acc + (cur.fee.amount - cur.amount), 0), 'FCFA'),
    };
    const file = await this.api.post('/report/print/registration', data).toPromise();
    console.log(file);
    // console.log({school: this.schools.list[0], ...data});
    // const win = window.open('', '_blank');
    // pdfMake.createPdf(getReceiptDocDefinition(data)).open({}, win);
  }
}

export function getReceiptDocDefinition(data) {
  const dotsNumber = 20;
  const char = ' ';
  return {
    pageSize: 'A4',
    content: [
      {
        columnGap: 0,
        columns: [
          // {
          //   image: '',
          //   width: 50,
          //   height: 50
          // },
          {
            text: data.school.nameLong,
            fontSize: 28,
            style: 'title'
          }
        ]
      },
      {
        text: data.school.zipCode,
        fontSize: 12,
        style: 'header'
      },
      {
        text: data.school.phones.reduce((acc, current) => acc + ' ' + current, ''),
        style: 'header'
      },
      {
        text: data.school.email,
        style: 'header'
      },
      {
        text: [
          { text: 'REÇU', style: 'veryBig', decoration: 'underline'},
          { text: ' N° ' + data.registration.code, style: 'veryBig', color: 'red', bold: true }
        ]
      },
      {
        style: {alignment: 'right'},
        text: [
          { text: 'ANNÉE : ', decoration: 'underline'},
          {
            text:
              moment(data.registration.schoolYear.startDate).format('YYYY') + ' - ' +
              moment(data.registration.schoolYear.endDate).format('YYYY')}
        ]
      },
      {
        text: '',
        style: 'spacer'
      },
      {
        columns: [
          {},
          {
            width: 'auto',
            table: {
              body: [
                [{ text: 'B.P.F', decoration: 'underline',  border: [false] },
                  { text: '.............................................', style: { border: [true] }}]
              ]
            }
          },
          {}
        ]
      },
      {
        style: 'content',
        text: [
          { text: 'Objet : '},
          { text: '........................................................', bold: true, alignment: 'center', width: '*' }
        ]
      },
      {
        style: 'content',
        text: [
          { text: 'Somme en lettres : '},
          { text: '........................................................', bold: true }
        ]
      },
      {
        style: 'content',
        text: [
          { text: 'Classe : '},
          { text: fill(dotsNumber, char) + data.classroom.name, bold: true, alignment: 'center', width: '*' }
        ]
      },
      {
        style: 'content',
        text: [
          { text: 'Nom : '},
          { text: fill(dotsNumber, char) + data.registration.student.lastname, bold: true }
        ]
      },
      {
        style: 'content',
        text: [
          { text: 'Prénoms : '},
          { text: fill(dotsNumber, char) + data.registration.student.firstname, bold: true }
        ]
      },
      {
        style: 'content',
        text: [
          { text: 'Reste à payer : '},
          { text: fill(dotsNumber, char) + ((Number(data.classroom.registrationFee.amount) + Number(data.classroom.schoolFee.tranches[0].amount)) - Number(data.registration.amount)).toString(), bold: true }
        ]
      },
      {
        text: '',
        style: 'spacer'
      },
      {
        style: { alignment: 'right', fontSize: 16},
        text: [
          { text: 'Date: '},
          { text: moment().format('DD MMMM YYYY'), bold: true }
        ]
      },
      {
        text: 'Signature',
        fontSize: 16,
        alignment: 'right',
        margin: [0, 10, 0, 0]
      },
      {
        text: '',
        style: 'spacer'
      },
      {
        text: 'NB :',
        style: 'content'
      },
      {
        text: '- 1ère tranche : à l\'inscription',
        style: 'content'
      },
      {
        text: '- 2è tranche : avant le ' + moment(data.classroom.schoolFee.tranches[1].dueDate).format('DD MMMM YYYY'),
        style: 'content'
      },
      {
        text: '- 3è tranche : avant le ' + moment(data.classroom.schoolFee.tranches[2].dueDate).format('DD MMMM YYYY'),
        style: 'content'
      },
      {
        text: 'TOUTE SOMME VERSÉE CONTRE CE REÇU N\'EST PLUS REMBOURSÉE :',
        style: 'content'
      },
      {
        text: 'Une fois le délai de paiement passé, l\'élève reste à la maison jusqu\'à ce que ses parents s\'acquittent de l\'écolage',
        style: 'contentSmall',
        alignment: 'center'
      },
    ],
    styles: {
      title: {
        fontSize: 20,
        bold: true,
        alignment: 'center',
        margin: [
          0,
          10,
          0,
          10
        ],
        decoration: 'underline',
        decorationStyle: 'double'
      },
      header: {
        fontSize: 14,
        bold: true,
        alignment: 'center',
        margin: [
          0,
          2,
          0,
          2
        ]
      },
      student: {
        fontSize: 14,
        margin: [
          0,
          2,
          0,
          2
        ]
      },
      headerCell: {
        fillColor: '#eeeeee',
        margin: [
          20,
          20,
          20,
          20
        ],
        border: [
          false,
          false,
          false,
          true
        ]
      },
      tableCell: {
        margin: [
          20,
          5,
          0,
          2
        ]
      },
      row: {
        heights: [
          20,
          50,
          70
        ]
      },
      spacer: {
        margin: [
          0,
          10,
          0,
          10
        ]
      },
      veryBig: {
        fontSize: 20,
        margin: [
          0,
          10,
          0,
          10
        ]
      },
      content: {
        fontSize: 14,
        margin: [
          0,
          10,
          0,
          10
        ],
      },
      contentSmall: {
        fontSize: 14,
        margin: [
          0,
          10,
          0,
          10
        ]
      }
    }

  };
}

export function fill(length, fillWith: string) {
  return Array(length).fill(fillWith).reduce((acc, current) => acc + fillWith , '');
}


