import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

import { environment } from '../../../environments/environment';
import { IContactmail } from './models/contactmail';
import { MailService } from './_services/mail.service';
import { SeoService } from './../../shared/services/seo.service';
import { OfficeInfoModalComponent } from './officeinfo-modal/office-info-modal.component';

@Component({
  selector: 'vsoft-nx-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  officeModalRef: BsModalRef;

  waitMilliseconds = 2000;
  busy = false;
  alerts: any[] = [{}];

  contactMail: IContactmail;
  templateName = 'contact.html';
  mailSubject: string;
  templateBody: string = null;

  form: FormGroup;
  urlEmail: string = null;
  urlName: string = null;
  urlPhone: string = null;
  urlRr: string = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private seoS: SeoService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private ms: MailService,
    private ts: TranslateService
  ) {}

  ngOnInit(): void {
    this.seoS.setAll('CONTACT');
    // http://localhost:4200/#/contact?email=josvermoesen@outlook.be&name=joske
    this.activatedRoute.queryParams.subscribe((params) => {
      this.urlEmail = params['email'];
      this.urlName = params['name'];
      this.urlPhone = params['phone'];
      this.urlRr = params['rR'];
      console.log('email is: ' + this.urlEmail);
      console.log('name is ' + this.urlName);
    });
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
        this.createContactForm();
      });
  }

  createContactForm() {
    this.ts.get('CONTACT.MessageTitle').subscribe((res: string) => {
      this.mailSubject = res;
    });

    this.form = this.fb.group({
      subject: [this.mailSubject, Validators.required],
      name: [this.urlName, Validators.required],
      rR: [
        this.urlRr,
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
      phone: [this.urlPhone],
      copySender: [true],
      message: ['', Validators.required],
      template: [this.templateBody],
      data: [null],
      apiGuid: [environment.apiVsoftMailGuid, Validators.required],
      apiMailKey: [environment.apiVsoftSendFromAddress, Validators.required],
      apiNameKey: [environment.apiVsoftSendFromName, Validators.required],
    });
    console.log(this.form.value);
  }

  refreshTemplateBody() {
    const stringNameToReplace = '.{name}';
    // name insert
    this.templateBody = this.templateBody.replace(
      stringNameToReplace,
      this.form.value.name
    );

    const stringInBlockToReplace = '.{message}';
    // name insert
    this.templateBody = this.templateBody.replace(
      stringInBlockToReplace,
      this.form.value.message
    );

    this.form.value.template = this.templateBody;
    console.log(this.form.value);
  }

  submitContactMail() {
    console.log(this.form.value);
    this.refreshTemplateBody();
    console.log(this.form.value);

    this.contactMail = Object.assign({}, this.form.value);
    this.busy = true;
    this.ms.contactmail(this.contactMail).subscribe(
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

  onOfficeModal() {
    const lblTitle = 'Kantooruren';
    const lblCloseBtnName = 'Sluiten';

    const initialState = {
      title: lblTitle,
    };
    this.officeModalRef = this.modalService.show(OfficeInfoModalComponent, {
      initialState,
    });
    this.officeModalRef.content.closeBtnName = lblCloseBtnName;
  }
}
