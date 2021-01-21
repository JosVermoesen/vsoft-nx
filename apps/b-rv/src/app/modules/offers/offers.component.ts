/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

import { environment } from '../../../environments/environment';
import { IContactmail } from './models/contactmail';
import { MailService } from './services/mail.service';
import { SeoService } from './../../shared/services/seo.service';

@Component({
  selector: 'vsoft-nx-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
  waitMilliseconds = 2000;
  busy = false;
  alerts: any[] = [{}];

  choiseMade = false;
  hidePerson2 = true;
  hidePerson3 = true;

  qrElementType = 'url';
  // qrValue = 'https://github.com/JosVermoesen/ing-portfolio';
  qrResult: any;
  qrValue: any;

  qrIbanValue = 'BE83891854037015';
  qrBicValue = 'VDSPBE91';
  qrNameValue = 'Roelandt en Vermoesen bv';

  qrAmountValue = 'EUR74.25';
  qrReferenceValue = '107/0404/08059'

  gadgetsMail: IContactmail;
  templateName = 'ea-offer-medicall.html';
  mailSubject = 'Europ Assistance MEDICALL';
  templateBody: string = null;

  form: FormGroup;
  urlEmail: string = null;
  urlName: string = null;

  offerForm: FormGroup;

  urlId: string;

  /* MEDICALL eerste jaarpremie:
  EUR 36.75 => Een verzekerde
  EUR 51.75 => Twee verzekerden
  EUR 74.25 => Drie of meer verzekerden(max. 8) */
  offerOptions = [
    {
      option: '1: Een verzekerde (€36.75)'
    },
    {
      option: '2: Twee verzekerden (€51.75)'
    },
    {
      option: '3: Drie tot acht verzekerden (€74.25)'
    }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private seoS: SeoService,
    private fb: FormBuilder,
    private ms: MailService,
    private ts: TranslateService
  ) { }

  ngOnInit(): void {
    this.qrRefresh();
    // http://localhost:4200/#/offers?email=josvermoesen@outlook.be&name=joske&reference=123/4567/89112
    this.activatedRoute.queryParams.subscribe((params) => {
      this.urlId = params['id'];
      this.urlEmail = params['email'];
      this.urlName = params['name'];
      this.qrReferenceValue = params['reference'];

      /* console.log('in url: ', this.urlG101);
      switch (this.urlG101) {
        case '0': // post only
          this.urlG101 = this.sendOptions[0].option;
          break;

        case '1': // post only
          this.urlG101 = this.sendOptions[1].option;
          break;

        case '2': // post only
          this.urlG101 = this.sendOptions[2].option;
          break;
      }
      console.log('and after: ', this.urlG101); */
    });

    this.seoS.setAll('MAILFORM');
    this.initTemplate();
  }

  qrRefresh() {
    const lf = '\n';
    const serviceTagValue = 'BCD';
    const versionValue = '001';
    const charactersetValue = '1';
    const identificationValue = 'SCT';
    const purposeValue = 'GDDS';
    const remittanceValue = '';
    const informationValue = '';

    this.qrValue =
      serviceTagValue + lf +
      versionValue + lf +
      charactersetValue + lf +
      identificationValue + lf +
      this.qrBicValue + lf +
      this.qrNameValue + lf +
      this.qrIbanValue + lf +
      this.qrAmountValue + lf +
      purposeValue + lf +
      this.qrReferenceValue + lf +
      remittanceValue + lf +
      informationValue;
  }

  initTemplate() {
    this.http
      .get('assets/templates/mail/' + this.templateName, {
        responseType: 'text',
      })
      .subscribe((data) => {
        // console.log(data);
        this.templateBody = data;
        this.createOffersForm();
      });
  }

  createOffersForm() {
    this.offerForm = this.fb.group({
      optionChoise: [null],
      person1: [this.urlName, Validators.required],
      birthday1: [null, Validators.required],
      person2: [null],
      birthday2: [null],
      person3: [null],
      birthday3: [null]
    });

    this.form = this.fb.group({
      subject: [this.mailSubject + ' {' + this.urlId + '}', Validators.required],
      name: [this.urlName, Validators.required],
      rR: [
        '00000000000',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      email: [
        this.urlEmail,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
      ],
      phone: [null],
      copySender: [true],
      message: [JSON.stringify(this.offerForm.value)],
      template: [this.templateBody],
      data: [null],
      apiGuid: [environment.apiVsoftMailGuid, Validators.required],
      apiMailKey: [environment.apiVsoftSendFromAddress, Validators.required],
      apiNameKey: [environment.apiVsoftSendFromName, Validators.required],
    });
  }

  refreshTemplateBody() {
    const stringToReplace = '.{name}';
    // name insert
    this.templateBody = this.templateBody.replace(
      stringToReplace,
      this.form.value.name
    );

    // check select g101
    const cOption = '.{option}';
    this.templateBody =
      this.templateBody.replace(cOption, this.offerForm.value.optionChoise.option);

    this.form.value.message = JSON.stringify(this.offerForm.value);
    this.form.value.template = this.templateBody;
  }

  submitGadgetMail() {
    this.refreshTemplateBody();
    this.gadgetsMail = Object.assign({}, this.form.value);
    console.log(this.gadgetsMail);
    this.busy = true;
    this.ms.sendMail(this.gadgetsMail).subscribe(
      () => {
        this.ts.get('CONTACT.SendSuccess').subscribe((res: string) => {
          this.ngxAlert('success', res);
        });
      },
      (error) => {
        console.log(error);
        this.ts.get('CONTACT.SendFailed').subscribe((res: string) => {
          this.ngxAlert('danger', res);
          this.busy = false;
        });
      },
      () => {
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, this.waitMilliseconds);
        this.busy = false;
      }
    );
  }

  ngxAlert(ofType: string, message: string): void {
    this.alerts.push({
      type: ofType,
      msg: message,
      timeout: this.waitMilliseconds,
    });
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter((alert) => alert !== dismissedAlert);
  }

  onChange() {
    const chosen: string = this.offerForm.value.optionChoise.option.substring(0, 1);
    this.choiseMade = true;
    switch (chosen) {
      case '1':
        this.qrAmountValue = 'EUR36.75';
        this.hidePerson2 = true;
        this.hidePerson3 = true;
        break;

      case '2':
        this.qrAmountValue = 'EUR51.75';
        this.hidePerson2 = false;
        this.hidePerson3 = true;
        break;

      case '3':
        this.qrAmountValue = 'EUR74.25';
        this.hidePerson2 = false;
        this.hidePerson3 = false;
        break;
    }
    this.qrRefresh();
  }
}
