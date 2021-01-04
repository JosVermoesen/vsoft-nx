import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IContactmail } from '../models/contactmail';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { MailService } from '../_services/mail.service';

@Component({
  selector: 'vsoft-nx-modal-meetup',
  templateUrl: './modal-meetup.component.html',
})
export class ModalMeetupComponent implements OnInit {
  title: string;
  validCode = false;
  codeForNow: string;

  meetupForm: FormGroup;
  getCodeForm: FormGroup;
  contactForm: FormGroup;
  contactMail: IContactmail;

  templateName = 'sendcode.html';
  mailSubject = 'MeetUp Code';
  templateBody: string = null;

  urlEmail: string = null;
  urlName = 'nothing';
  urlPhone: string = null;
  urlRr = '00000000000';

  constructor(
    public bsModalRef: BsModalRef,
    private http: HttpClient,
    private ms: MailService) { }

  ngOnInit() {
        this.initTemplate();
        this.codeForNow = environment.meetupCode;
  }

  initTemplate() {
    this.http
      .get('assets/templates/mail/' + this.templateName, {
        responseType: 'text',
      })
      .subscribe((data) => {
        this.templateBody = data;
        this.createMeetupForm();
        this.createGetCodeForm();
        this.createContactForm();
      });
  }

  createMeetupForm() {
    this.meetupForm = new FormGroup({
      meetCode: new FormControl('', [Validators.required])
    });
  }

  createGetCodeForm() {
    this.getCodeForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')])
    });
  }

  createContactForm() {
    this.contactForm = new FormGroup({
      subject: new FormControl(this.mailSubject),
      name: new FormControl(this.urlName),
      rR: new FormControl(this.urlRr),
      email: new FormControl(null),
      phone: new FormControl(null),
      copySender: new FormControl(true),
      message: new FormControl('nothing'),
      template: new FormControl(this.templateBody),
      data: new FormControl(null),
      apiGuid: new FormControl(environment.apiVsoftMailGuid),
      apiMailKey: new FormControl(environment.apiVsoftSendFromAddress),
      apiNameKey: new FormControl(environment.apiVsoftSendFromName)
    });
  }

  onSubmit() {
    if (this.meetupForm.value.meetCode == this.codeForNow) {
      this.validCode = true;
    } else {
      this.createMeetupForm();
    }
  }

  onGetCode() {
    this.contactForm.value.email = this.getCodeForm.value.email;
    this.refreshTemplateBody();

    if (this.contactForm.valid) {
      this.contactMail = Object.assign({}, this.contactForm.value);
      // this.busy = true;
      this.ms.contactmail(this.contactMail).subscribe(
        () => {
          // success
        },
        (error) => {
          // failed
          console.log('failed');
          console.log(error);
        },
        () => {
          // dismiss
          this.bsModalRef.hide();
        }
      );
    }
  }

  refreshTemplateBody() {
    const stringToReplace = '.{meetUpCode}';
    // name insert
    this.templateBody = this.templateBody.replace(
      stringToReplace,
      this.codeForNow
    );
    this.contactForm.value.template = this.templateBody;
  }
}
