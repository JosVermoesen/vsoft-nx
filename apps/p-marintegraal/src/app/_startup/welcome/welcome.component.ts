import { LanguageService } from './../../_services/language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vsoft-nxwelcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
  constructor(private ls: LanguageService) {}

  ngOnInit() {

  }
}
