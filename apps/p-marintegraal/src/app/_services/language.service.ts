import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = '';

  constructor(private ts: TranslateService) {}

  setInitialAppLanguage() {
    const language = this.ts.getBrowserLang();
    this.ts.setDefaultLang(language);

    const val = localStorage.getItem(LNG_KEY);
    if (val) {
      this.setLanguage(val);
      this.selected = val;
    }
  }

  getLanguages() {
    return [
      {
        text: 'Nederlands',
        subtext: 'Vlaanderen, Brussel',
        value: 'nl',
        img: 'assets/images/flags/nl_small.png'
      }/* ,
      {
        text: 'Français',
        subtext: 'La Wallonie, Bruxelles',
        value: 'fr',
        img: 'assets/images/flags/fr_small.png'
      },
      {
        text: 'Deutsch',
        subtext: 'Ostbelgien',
        value: 'de',
        img: 'assets/images/flags/de_small.png'
      },
      {
        text: 'English',
        subtext: '',
        value: 'en',
        img: 'assets/images/flags/en_small.png'
      } */
    ];
  }

  setLanguage(lng: string) {
    this.ts.use(lng);
    this.selected = lng;
    localStorage.setItem(LNG_KEY, lng);
  }
}
