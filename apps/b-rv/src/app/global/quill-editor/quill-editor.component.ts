import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import Quill from 'quill';

@Component({
  selector: 'vsoft-nx-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.css'],
})
export class QuillEditorComponent implements OnInit {
  blurred = false;
  focused = false;

  foldersAndNames: string[] = [];
  htmlContent: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.foldersAndNames.push('mail/contact.html');
    this.foldersAndNames.push('mail/eindejaar.html');
    this.foldersAndNames.push('mail/gdpr.html');
    this.foldersAndNames.push('mail/gdprInfo.html');
    this.foldersAndNames.push('mail/register.html');
    this.foldersAndNames.push('mail/sendcode.html');

    this.foldersAndNames.push('html/assurmifid.html');
    this.foldersAndNames.push('html/gi.html');
    this.foldersAndNames.push('html/livingFlanders.html');
    this.foldersAndNames.push('html/schadeAttest.html');
    this.foldersAndNames.push('html/sectorCatalog.html');
    this.foldersAndNames.push('html/taxOnWeb.html');

    this.getContent(this.foldersAndNames[0]);
  }

  getContent(folderName: string) {
    this.http
      .get('assets/templates/' + folderName, {
        responseType: 'text',
      })
      .subscribe((data) => {
        this.htmlContent = data;
      });
  }

  setMailTemplate(selectEvent: any) {
    this.getContent(selectEvent);
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
