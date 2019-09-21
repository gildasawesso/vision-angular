import {Injectable} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Registration} from '../../models/registration';
import {School} from '../../models/school';
import {SchoolsRepository} from '../../core/repositories/schools.repository';
import {Payment} from '../../models/payment';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PrintUtil {

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private schools: SchoolsRepository) {
  }


  receipt(data: Payment | any) {
    console.log({school: this.schools.get[0], ...data});
    const win = window.open('', '_blank');
    console.log(getReceiptDocDefinition({school: this.schools.get[0], ...data}));
    pdfMake.createPdf(getReceiptDocDefinition({school: this.schools.get[0], ...data})).open({}, win);
  }

  buildReceiptData(registration: any) {
    return {...registration};
  }
}

export function getReceiptDocDefinition(data) {

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
            text: 'COMPLEXE SCOLAIRE AMEN',
            fontSize: 28,
            style: 'title'
          }
        ]
      },
      {
        text: '07 BP 155 Cotonou',
        fontSize: 12,
        style: 'header'
      },
      {
        text: '21350890949 4979766431414',
        style: 'header'
      },
      {
        text: 'csamen@gmail.com',
        style: 'header'
      },
      {
        text: [
          { text: 'REÇU', style: 'veryBig', decoration: 'underline'},
          { text: ' N° 0000045', style: 'veryBig', color: 'red', bold: true }
        ]
      },
      {
        style: {alignment: 'right'},
        text: [
          { text: 'ANNÉE', decoration: 'underline'},
          { text: ' 2019 - 2020' }
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
          { text: '........................................................', bold: true }
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
          { text: '........................................................', bold: true }
        ]
      },
      {
        style: 'content',
        text: [
          { text: 'Nom : '},
          { text: '........................................................', bold: true }
        ]
      },
      {
        style: 'content',
        text: [
          { text: 'Prénoms : '},
          { text: '........................................................', bold: true }
        ]
      },
      {
        style: 'content',
        text: [
          { text: 'Reste à payer : '},
          { text: '........................................................', bold: true }
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
          { text: '........................................................', bold: true }
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
        text: '- 2è tranche : avant le 28 Novembre 20',
        style: 'content'
      },
      {
        text: '- 3è tranche : avant le 28 Janvier 20',
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
        fontSize: 16,
        margin: [
          0,
          10,
          0,
          10
        ]
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


