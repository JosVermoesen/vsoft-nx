import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

import { CustomerService } from '../../customers/services/customer.service';
import { ICustomer } from '../../customers/models/customer';

import { MailService } from '../services/mail.service';
import { IContactmail } from '../models/contactmail';
import { AlertifyService } from '../../../_services/alertify.service';

@Component({
  selector: 'vsoft-nx-mail-management',
  templateUrl: './mail-management.component.html'
})
export class MailManagementComponent implements OnInit {
  customers: ICustomer[];
  cols: any[];

  mailCounter = 0;
  labelMessage: string;

  gadgetsMail: IContactmail;
  templateName = 'gdprInfo.html';
  // templateName = 'gdprUitnodiging.html';
  mailSubject = 'InfoFiche';
  templateBody: string = null;

  form: FormGroup;
  urlEmail: string = null;
  urlName: string = null;

  checkForm: FormGroup;

  urlId: string;
  urlG101: string;
  urlG102 = false;
  urlG103 = false;
  urlG104 = false;
  urlG105 = false;
  sendOptions = [
    {
      option: '0: Via Post'
    },
    {
      option: '1: Mail uitnodiging (PULL)'
    },
    {
      option: '2: In mail (PUSH)'
    }
  ];

  constructor(
    private vCS: CustomerService,
    private http: HttpClient,
    private fb: FormBuilder,
    private ms: MailService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.cols = [
      { field: 'whatever', header: 'Id and Name' },
      { field: 'v224', header: 'Email' }
    ];
    this.getClientsWithMailAddress();
  }

  getClientsWithMailAddress() {
    this.vCS
      .getVsoftCustomersWithMail()
      .subscribe(
        (res: ICustomer[]) => {
          this.customers = res;
        },
        error => {
          console.log(error.error);
        }
      );
  }

  remove(customer: ICustomer) {
    // console.log(customer);
    if (this.customers.some(x => x.id === customer.id)) {
      this.customers = this.customers.filter(i => i.id !== customer.id);
    }
  }

  send(customer: ICustomer) {
    // console.log(customer);
    this.initTemplate(customer);
  }

  initTemplate(customer: ICustomer) {
    this.http
      .get('assets/templates/mail/' + this.templateName, {
        responseType: 'text',
      })
      .subscribe((data) => {
        // console.log(data);
        this.templateBody = data;
        this.createGadgetsForm(customer);
        this.submitGadgetMail(customer);
      });
  }

  createGadgetsForm(customer: ICustomer) {
    /* this.ts.get('CONTACT.MessageTitle').subscribe((res: string) => {
      this.mailSubject = res;
    }); */

    switch (customer.g101) {
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

    this.checkForm = this.fb.group({
      g101: [customer.g101],
      g102: [customer.g102],
      g103: [customer.g103],
      g104: [customer.g104],
      g105: [customer.g105],
    });

    this.form = this.fb.group({
      subject: [this.mailSubject + ' {' + customer.id + '}', Validators.required],
      name: [customer.a100 + ' ' + customer.a101, Validators.required],
      rR: [
        '00000000000',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      email: [
        customer.v224,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
      ],
      phone: [null],
      copySender: [true],
      message: [JSON.stringify(this.checkForm.value)],
      template: [this.templateBody],
      data: [null],
      apiGuid: [environment.apiVsoftMailGuid, Validators.required],
      apiMailKey: [environment.apiVsoftSendFromAddress, Validators.required],
      apiNameKey: [environment.apiVsoftSendFromName, Validators.required],
    });
    // console.log(this.form.value);
  }

  submitGadgetMail(customer: ICustomer) {
    // console.log(this.form.value);
    this.refreshTemplateBody(customer);
    console.log(this.templateBody);

    this.gadgetsMail = Object.assign({}, this.form.value);
    this.ms.sendMail(this.gadgetsMail).subscribe(
      () => {
        // console.log('success');
        this.labelMessage = 'success, ';
      },
      (error) => {
        // console.log('failed');
        this.labelMessage = 'failed!';
        this.alertify.error(this.labelMessage);
      },
      () => {
        ++this.mailCounter;
        // console.log('counting: ', this.mailCounter);
        this.labelMessage = this.labelMessage + 'counting: ' + this.mailCounter;
        this.alertify.success(this.labelMessage);
      }
    );
  }

  refreshTemplateBody(customer: ICustomer) {
    const stringToReplace = '.{name}';
    // name insert
    this.templateBody = this.templateBody.replace(
      stringToReplace,
      this.form.value.name
    );

    const cA100 = '.{a100}';
    this.templateBody = this.templateBody.replace(
      cA100, customer.a100);
    const cA101 = '.{a101}';
    this.templateBody = this.templateBody.replace(
      cA101, customer.a101);
    const cV301 = '.{v301}';
    this.templateBody = this.templateBody.replace(
      cV301, customer.v301);
    const cA161 = '.{a161}';
    this.templateBody = this.templateBody.replace(
      cA161, customer.a161);
    const cV226 = '.{v226}';
    this.templateBody = this.templateBody.replace(
      cV226, customer.v226);
    const cV224 = '.{v224}';
    this.templateBody = this.templateBody.replace(
      cV224, customer.v224);

    const cA125 = '.{a125}';
    this.templateBody = this.templateBody.replace(
      cA125, customer.a125);
    const cA127 = '.{a127}';
    this.templateBody = this.templateBody.replace(
      cA127, customer.a127);
    const cV302 = '.{v302}';
    this.templateBody = this.templateBody.replace(
      cV302, customer.v302);
    const cV244 = '.{v244}';
    this.templateBody = this.templateBody.replace(
      cV244, customer.v244);
    const cV002 = '.{v002}';
    this.templateBody = this.templateBody.replace(
      cV002, customer.v002);

    const cA10a = '.{a10a}';
    this.templateBody = this.templateBody.replace(
      cA10a, customer.a10a);

    // check select g101
    const cG101 = '.{g101}';
    this.templateBody =
      this.templateBody.replace(cG101, this.urlG101);

    // check boxes g102
    const cG102 = '.{g102}';
    if (this.checkForm.value.g102 === '1') {
      this.templateBody = this.templateBody.replace(cG102, 'Een ');
      const g102Val = 'true';
    } else {
      this.templateBody = this.templateBody.replace(cG102, 'Geen ');
      const g102Val = 'false';
    }

    // check boxes g103
    const cG103 = '.{g103}';
    if (this.checkForm.value.g103 === '1') {
      this.templateBody = this.templateBody.replace(cG103, 'Een ');
    } else {
      this.templateBody = this.templateBody.replace(cG103, 'Geen ');
    }

    // check boxes g104
    const cG104 = '.{g104}';
    if (this.checkForm.value.g104 === '1') {
      this.templateBody = this.templateBody.replace(cG104, 'Een ');
    } else {
      this.templateBody = this.templateBody.replace(cG104, 'Geen ');
    }

    // check boxes g105
    const cG105 = '.{g105}';
    if (this.checkForm.value.g105 === '1') {
      this.templateBody = this.templateBody.replace(cG105, 'Een ');
    } else {
      this.templateBody = this.templateBody.replace(cG105, 'Geen ');
    }

    const cParams = '.{gdprInfoUrl}';
    const gdprInfoUrl =
      'https://rv.be/#/gadgets?' +
      'id=' + customer.id + '&' +
      'email=' + customer.v224 + '&' +
      'name=' + customer.a100 + ' ' + customer.a101 + '&' +
      'g101=' + customer.g101 + '&' +
      'g102=' + customer.g102 + '&' +
      'g103=' + customer.g103 + '&' +
      'g104=' + customer.g104 + '&' +
      'g105=' + customer.g105;
    this.templateBody = this.templateBody.replace(cParams, gdprInfoUrl);
    // http://localhost:4200/#/gadgets?email=josvermoesen@outlook.be&name=joske&g102=true&g103=false&g104=true&g105=true

    this.form.value.message = JSON.stringify(this.checkForm.value);
    this.form.value.template = this.templateBody;
    console.log(this.form.value);
  }

  sendAll() {
    console.log(this.customers);
  }
}
