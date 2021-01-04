import { Component, OnInit } from '@angular/core';
import { LanguageService } from './global/navbar/services/language.service';

@Component({
  selector: 'vsoft-nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dummy';

  constructor(private ls: LanguageService) { }

  ngOnInit() {
    this.ls.setInitialAppLanguage();
  }
}
