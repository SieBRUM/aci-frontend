import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ACIRental';

  constructor(
    public translate: TranslateService,
    private router: Router
  ) {
    this.initLanguage();
    
  }

  initLanguage(): void {
    this.translate.addLangs(['en', 'nl']);
    this.translate.setDefaultLang('en');

    const localStorageLanguage = localStorage.getItem('language');
    const browserLang = this.translate.getBrowserLang();

    if (localStorageLanguage && this.translate.langs.includes(localStorageLanguage)) {
      this.translate.use(localStorageLanguage);
    } else if (this.translate.langs.includes(browserLang)) {
      this.translate.use(browserLang);
    } else {
      this.translate.use(this.translate.getDefaultLang());
    }

    localStorage.setItem('language', this.translate.currentLang);
  }

}
