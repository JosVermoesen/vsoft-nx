import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

import { LanguageService } from './../../../_services/language.service';

@Component({
  selector: 'vsoft-nxmodallanguage',
  templateUrl: './modallanguage.component.html'
})
export class ModalLanguageComponent implements OnInit {
  languages = [];
  selected = '';
  public onSelected: Subject<boolean>;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.onSelected = new Subject();
    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;
  }

  select(lng) {
    this.languageService.setLanguage(lng);
    this.onSelected.next(true);
    this.ref.close('selected');
  }

  onCanceled() {
    this.ref.close('cancel');
  }
}
