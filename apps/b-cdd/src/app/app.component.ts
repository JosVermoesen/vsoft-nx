import { Component, OnInit } from '@angular/core';
import { LanguageService } from './_services/language.service';

@Component({
  selector: 'vsoft-nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private ls: LanguageService) { }

  ngOnInit() {
    this.ls.setInitialAppLanguage();
  }
}
