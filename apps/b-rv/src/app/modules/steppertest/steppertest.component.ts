import { environment } from './../../../environments/environment.prod$';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import Quill from 'quill';

import { TranslateService } from '@ngx-translate/core';

import Stepper from 'bs-stepper';
import { IContactmail } from '../contact/models/contactmail';
import { MailService } from '../contact/_services/mail.service';

@Component({
  selector: 'vsoft-nx-steppertest',
  templateUrl: './steppertest.component.html',
  styleUrls: ['./steppertest.component.scss'],
})
export class SteppertestComponent implements OnInit {
  private contactStepper: Stepper;

  blurred = false;
  focused = false;
  htmlContent: string;

  alerts: any[] = [{}];

  contactForm: FormGroup;

  contactMail: IContactmail;
  mailSubject: string;
  busy = false;

  constructor(
    private fb: FormBuilder,
    private ms: MailService,
    private ts: TranslateService
  ) {}

  ngOnInit(): void {
    this.createContactForm();
    this.contactStepper = new Stepper(
      document.querySelector('#contactstepper'),
      {
        linear: false,
        animation: true,
      }
    );
  }

  createContactForm() {
    this.ts.get('CONTACT.MessageTitle').subscribe((res: string) => {
      this.mailSubject = res;
    });

    this.contactForm = this.fb.group({
      subject: [this.mailSubject, Validators.required],
      name: [null, Validators.required],
      rR: [
        null,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
      ],
      phone: [null],
      copySender: [true],
      message: ['', Validators.required],
      template: [null],
      data: [null],
      apiGuid: [environment.apiVsoftMailGuid, Validators.required],
      apiMailKey: [environment.apiVsoftSendFromAddress, Validators.required],
      apiNameKey: [environment.apiVsoftSendFromName, Validators.required],
    });
  }

  contactPrevious() {
    this.contactStepper.previous();
  }

  contactNext() {
    this.contactStepper.next();
  }

  onSubmit() {
    console.log(this.contactForm.value);
    return false;
  }

  showHtml() {
    // tslint:disable-next-line:no-console
    console.log(this.htmlContent);
  }

  created(event: Quill) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event);
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    console.log('editor-change', event);
  }

  focus($event) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event);
    this.focused = true;
    this.blurred = false;
  }

  blur($event) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event);
    this.focused = false;
    this.blurred = true;
  }
}
