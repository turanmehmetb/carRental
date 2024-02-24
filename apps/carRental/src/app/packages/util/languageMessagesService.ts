import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import localeEn from '@angular/common/locales/en';
import { Injectable } from '@angular/core';
import { enjson, trjson } from '@carRental/models';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig, Translation } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class LanguageMessagesService {

  msgjson: { [key: string]: string };

  constructor(
    private readonly primengConfig: PrimeNGConfig,
    private readonly translateService: TranslateService,
  ) {
    registerLocaleData(localeTr, 'tr');
    registerLocaleData(localeEn, 'en');
  }

  changeLanguage(lang: string) {
    localStorage.setItem('locale', lang);
  }

  setLanguage() {
    let lang = localStorage.getItem('locale');
    if (!lang) {
      localStorage.setItem('locale', 'tr');
      lang = 'tr';
      this.initLanguage('tr');
    } else {
      this.initLanguage(lang);
    }
  }

  initLanguage(lang: string) {
    if (lang === 'en') {
      this.msgjson = enjson.messages;
    } else {
      this.msgjson = trjson.messages;
    }
    this.setTranslate();
    this.translateService.use(lang);
    this.translateService.setDefaultLang(lang);
  }

  setTranslate() {
    let translation: Translation = {...this.msgjson};
    this.primengConfig.setTranslation(translation);
  }

}
