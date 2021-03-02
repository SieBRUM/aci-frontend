import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './app-home-page.component.html',
  styleUrls: ['./app-home-page.component.scss']
})
export class AppHomePageComponent implements OnInit {

  constructor(
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
  }

  onChangeLanguage(language: string): void {
    if (!this.translate.langs.includes(language)) {
      language = this.translate.getDefaultLang();
    }

    localStorage.setItem('language', language);
    this.translate.use(language);
  }

  translateLanguage(language: string): string {
    return this.translate.instant(`SIDE_BAR.LANGUAGES.${language.toUpperCase()}`);
  }

}
