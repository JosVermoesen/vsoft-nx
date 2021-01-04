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
  selector: 'vsoft-nx-gadgets',
  templateUrl: './gadgets.component.html',
})
export class GadgetsComponent implements OnInit {
  waitMilliseconds = 2000;
  busy = false;
  alerts: any[] = [{}];

  gadgetsMail: IContactmail;
  templateName = 'gdpr.html';
  // templateName = 'gdprUitnodiging.html';
  mailSubject = 'Eindejaar - Info fiche Update';
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
      option: '2: In mail (PUSH)'
    },
    {
      option: '1: Mail uitnodiging (PULL)'
    },
    {
      option: '0: Via Post'
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
    // http://localhost:4200/#/gadgets?email=josvermoesen@outlook.be&name=joske&g102=true&g103=false&g104=true&g105=true
    this.activatedRoute.queryParams.subscribe((params) => {
      this.urlId = params['id'];
      this.urlEmail = params['email'];
      this.urlName = params['name'];

      this.urlG101 = params['g101'];
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

      const valG102 = params['g102'];
      if (valG102 === '1') {
        this.urlG102 = true;
      } else {
        this.urlG102 = false;
      }
      const valG103 = params['g103'];
      if (valG103 === '1') {
        this.urlG103 = true;
      } else {
        this.urlG103 = false;
      }
      const valG104 = params['g104'];
      if (valG104 === '1') {
        this.urlG104 = true;
      } else {
        this.urlG104 = false;
      }
      const valG105 = params['g105'];
      if (valG105 === '1') {
        this.urlG105 = true;
      } else {
        this.urlG105 = false;
      }
    });

    this.seoS.setAll('MAILFORM');
    this.initTemplate();
  }

  initTemplate() {
    this.http
      .get('assets/templates/mail/' + this.templateName, {
        responseType: 'text',
      })
      .subscribe((data) => {
        // console.log(data);
        this.templateBody = data;
        this.createGadgetsForm();
      });
  }

  createGadgetsForm() {
    this.checkForm = this.fb.group({
      g101: [null, Validators.required],
      g102: [this.urlG102],
      g103: [this.urlG103],
      g104: [this.urlG104],
      g105: [this.urlG105],
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
      message: [JSON.stringify(this.checkForm.value)],
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
    const cG101 = '.{g101}';
    this.templateBody =
      this.templateBody.replace(cG101, this.checkForm.value.g101.option);

    // check boxes g102
    const cG102 = '.{g102}';
    if (this.checkForm.value.g102) {
      this.templateBody = this.templateBody.replace(cG102, 'Een ');
    } else {
      this.templateBody = this.templateBody.replace(cG102, 'Geen ');
    }

    // check boxes g103
    const cG103 = '.{g103}';
    if (this.checkForm.value.g103) {
      this.templateBody = this.templateBody.replace(cG103, 'Een ');
    } else {
      this.templateBody = this.templateBody.replace(cG103, 'Geen ');
    }

    // check boxes g104
    const cG104 = '.{g104}';
    if (this.checkForm.value.g104) {
      this.templateBody = this.templateBody.replace(cG104, 'Een ');
    } else {
      this.templateBody = this.templateBody.replace(cG104, 'Geen ');
    }

    // check boxes g105
    const cG105 = '.{g105}';
    if (this.checkForm.value.g105) {
      this.templateBody = this.templateBody.replace(cG105, 'Een ');
    } else {
      this.templateBody = this.templateBody.replace(cG105, 'Geen ');
    }
    this.form.value.message = JSON.stringify(this.checkForm.value);
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
}
