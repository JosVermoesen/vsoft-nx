/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { AbstractClassPart } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'vsoft-nx-pdf-tester',
  templateUrl: './pdf-tester.component.html'
})
export class PdfTesterComponent implements OnInit {
  locationAndFileName: string;
  imageAsBase64: string;

  qrElementType = 'url';
  qrValue: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const serviceTagValue = 'BCD\n';
    const versionValue = '001\n';
    const charactersetValue = '1\n';
    const identificationValue = 'SCT\n';
    const bicValue = 'VDSPBE91\n';
    const nameValue = 'Roelandt en Vermoesen bv\n';
    const ibanValue = 'BE83891854037015\n';
    const amountValue = 'EUR12.3\n';
    const purposeValue = 'GDDS\n';
    const referenceValue = '107/0404/08059\n'
    const remittanceValue = '\n';
    const informationValue = '\n';

    this.qrValue =
      serviceTagValue +
      versionValue +
      charactersetValue +
      identificationValue +
      bicValue + nameValue +
      ibanValue +
      amountValue +
      purposeValue +
      referenceValue +
      remittanceValue +
      informationValue;
  }

  testPdf() {
    const pdfDoc = new jsPDF();
    pdfDoc.setFontSize(40);
    pdfDoc.text('We love jsPDF', 55, 25);

    pdfDoc.setFontSize(18);
    pdfDoc.text('My PDF Title FontSize 18 at yRow 258 xColumn 11', 11, 258);
    pdfDoc.setFontSize(11);
    pdfDoc.setTextColor(100);
    pdfDoc.text('Bla bla Text1 FontSize 11 at yRow 265 xColomn 11', 11, 265);
    pdfDoc.text('Bla bla Text2 FontSize 11 at yRow 269 xColomn 11', 11, 269);
    pdfDoc.text('Bla bla Text3 FontSize 11 at yRow 273 xColomn 11', 11, 273);
    pdfDoc.text('Bla bla Text4 FontSize 11 at yRow 277 xColomn 11', 11, 277);
    pdfDoc.text('Bla bla Text5 FontSize 11 at yRow 281 xColomn 11', 11, 281);
    pdfDoc.text('Bla bla Text6 FontSize 11 at yRow 285 xColomn 11', 11, 285);
    pdfDoc.text('Bla bla Text7 FontSize 11 at yRow 289 xColomn 11', 11, 289);
    pdfDoc.text('Bla bla Text8 FontSize 11 at yRow 293 xColomn 11', 11, 293);

    // Download PDF document
    // pdfDoc.save('table.pdf');
    // Open PDF document in new tab (works with MS Edge, not with chrome)
    pdfDoc.output('dataurlnewwindow')

    /* const ukFlagPngFile = 'ukflag-160_80-png.imagebase64';
    this.locationAndFileName = ukFlagPngFile;
    this.http
      .get('assets/images/' + this.locationAndFileName, {
        responseType: 'text',
      })
      .subscribe((data) => {
        this.imageAsBase64 = data;
        pdfDoc.addImage(this.imageAsBase64, 'PNG', 80, 40, 53, 27);
      });

    const josJpgFile = 'jos-180_255-jpg.imagebase64';
    this.locationAndFileName = josJpgFile;
    this.http
      .get('assets/images/' + this.locationAndFileName, {
        responseType: 'text',
      })
      .subscribe((data) => {
        this.imageAsBase64 = data;
        pdfDoc.addImage(this.imageAsBase64, 'JPG', 75, 130, 60, 85);
      });

    const rvJpgFile = 'rv-871_115-jpg.imagebase64';
    this.locationAndFileName = rvJpgFile;
    this.http
      .get('assets/images/' + this.locationAndFileName, {
        responseType: 'text',
      })
      .subscribe((data) => {
        this.imageAsBase64 = data;
        pdfDoc.addImage(this.imageAsBase64, 'JPG', 20, 75, 174, 23);
      });

    const rvBmpFile = 'rv-852_124-bmp.imagebase64';
    this.locationAndFileName = rvBmpFile;
    this.http
      .get('assets/images/' + this.locationAndFileName, {
        responseType: 'text',
      })
      .subscribe((data) => {
        this.imageAsBase64 = data;
        pdfDoc.addImage(this.imageAsBase64, 'BMP', 20, 100, 174, 23);

        // Open PDF document in new tab (works with MS Edge, not with chrome)
        pdfDoc.output('dataurlnewwindow')
      }); */
  }
}
