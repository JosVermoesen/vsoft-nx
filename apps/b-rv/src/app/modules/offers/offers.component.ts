/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// import * as moment from 'moment';

import { TranslateService } from '@ngx-translate/core';

import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

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
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;

  waitMilliseconds = 2000;
  busy = false;
  alerts: any[] = [{}];

  choiseMade = false;
  hidePerson2 = true;
  hidePerson3 = true;
  numberInsured = 0;

  qrElementType = 'url';
  qrResult: any;
  qrValue: any;

  qrIbanValue = environment.brokerIban;
  qrBicValue = environment.brokerIban;
  qrNameValue = environment.brokerName;
  qrAmountValue: string = null;
  qrReferenceValue: string = null;

  offersMail: IContactmail;
  templateName = 'ea-offer-medicall.html';
  mailSubject = 'Europ Assistance MEDICALL';
  templateBody: string = null;

  form: FormGroup;
  urlEmail: string = null;
  urlName: string = null;
  urlId: string = null;

  offerForm: FormGroup;

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
    // http://localhost:4200/#/offers?id=010018&email=josvermoesen@outlook.be&name=Vermoesen Jos&reference=123/4567/89112
    this.activatedRoute.queryParams.subscribe((params) => {
      this.urlId = params['id'];
      this.urlEmail = params['email'];
      this.urlName = params['name'];
      this.qrReferenceValue = params['reference'];
    });
    this.seoS.setAll('MAILFORM');
    this.initTemplate();
  }

  submitGadgetMail() {

    this.refreshTemplateBody();
    // this.form.value.message =  JSON.stringify(this.offerForm.value);

    this.offersMail = Object.assign({}, this.form.value);
    console.log(Object.assign({}, this.offerForm.value));
    console.log(this.offersMail);
    this.busy = true;
    this.ms.sendMail(this.offersMail).subscribe(
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

  refreshTemplateBody() {
    const stringToReplace = '.{name}';
    // name insert
    this.templateBody = this.templateBody.replace(
      stringToReplace,
      this.form.value.name
    );

    // check select
    const cOption = '.{option}';
    this.templateBody =
      this.templateBody.replace(cOption, this.offerForm.value.optionChoise);

    // Person1
    const cPerson1 = '.{person1}';
    this.templateBody =
      this.templateBody.replace(cPerson1, this.offerForm.value.person1);
    // Birthday1
    const cBirthDay1 = '.{birthDay1}';
    this.templateBody =
      this.templateBody.replace(cBirthDay1, this.offerForm.value.birthDay1);
    // Person1
    const cPerson2 = '.{person2}';
    this.templateBody =
      this.templateBody.replace(cPerson2, this.offerForm.value.person2);
    // Birthday1
    const cBirthDay2 = '.{birthDay2}';
    this.templateBody =
      this.templateBody.replace(cBirthDay2, this.offerForm.value.birthDay2);
    // Person1
    const cPerson3 = '.{person3}';
    this.templateBody =
      this.templateBody.replace(cPerson3, this.offerForm.value.person3);
    // Birthday1
    const cBirthDay3 = '.{birthDay3}';
    this.templateBody =
      this.templateBody.replace(cBirthDay3, this.offerForm.value.birthDay3);


    // Amount
    const cAmount = '.{qrAmountValue}';
    this.templateBody =
      this.templateBody.replace(cAmount, this.qrAmountValue);
    // Reference
    const cReference = '.{qrReferenceValue}';
    this.templateBody =
      this.templateBody.replace(cReference, this.qrReferenceValue);

    this.form.value.message = JSON.stringify(this.offerForm.value);
    this.form.value.template = this.templateBody;
  }

  onChange(e) {
    console.log(e.target.value);

    const assured: string = e.target.value.substring(0, 1);
    console.log(assured);
    this.choiseMade = true;
    switch (assured) {
      case '1':
        this.qrAmountValue = 'EUR36.75';
        this.hidePerson2 = true;
        this.hidePerson3 = true;
        this.numberInsured = 1;
        break;

      case '2':
        this.qrAmountValue = 'EUR51.75';
        this.hidePerson2 = false;
        this.hidePerson3 = true;
        this.numberInsured = 2;
        break;

      case '3':
        this.qrAmountValue = 'EUR74.25';
        this.hidePerson2 = false;
        this.hidePerson3 = false;
        this.numberInsured = 3;
        break;
    }
    this.qrRefresh();
    this.createOffersForm(assured);
  }

  createOffersForm(chosen: string) {
    // this.offerForm = null;
    switch (chosen) {
      case '0':
      case '1':
        this.offerForm = this.fb.group({
          optionChoise: [chosen],
          person1: [this.urlName, Validators.required],
          birthDay1: [null, Validators.required],
          person2: [null],
          birthDay2: [null],
          person3: [null],
          birthDay3: [null]
        });
        break;

      case '2':
        this.offerForm = this.fb.group({
          optionChoise: [chosen],
          person1: [this.urlName, Validators.required],
          birthDay1: [null, Validators.required],
          person2: [null, Validators.required],
          birthDay2: [null, Validators.required],
          person3: [null],
          birthDay3: [null]
        });
        break;

      case '3':
        this.offerForm = this.fb.group({
          optionChoise: [chosen],
          person1: [this.urlName, Validators.required],
          birthDay1: [null, Validators.required],
          person2: [null, Validators.required],
          birthDay2: [null, Validators.required],
          person3: [null, Validators.required],
          birthDay3: [null, Validators.required]
        });
        break;
    }
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
        this.mainForm();
        // this.qrRefresh();
      });
  }

  mainForm() {
    this.createOffersForm('0');
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
      message: [null],
      template: [this.templateBody],
      data: [null],
      apiGuid: [environment.apiVsoftMailGuid, Validators.required],
      apiMailKey: [environment.apiVsoftSendFromAddress, Validators.required],
      apiNameKey: [environment.apiVsoftSendFromName, Validators.required],
    });
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

  enableTabs() {
    this.staticTabs.tabs[1].disabled = false;
    this.staticTabs.tabs[2].disabled = false;
  }
  disableTabs() {
    this.staticTabs.tabs[1].disabled = true;
    this.staticTabs.tabs[2].disabled = true;
  }
}
