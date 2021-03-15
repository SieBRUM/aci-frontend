import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isMenuOpen = true;
  isMenuPinned = false;

  constructor(
    public translate: TranslateService,
  ) {
    this.initLanguage();
    this.initMenuBar();
  }

  onClickSideBar(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getMenuMode(): MatDrawerMode {
    return this.isMenuPinned ? 'side' : 'over';
  }

  onPinnedChange(pinned: boolean): void {
    if (this.isMenuPinned === pinned) {
      return;
    }

    this.isMenuPinned = pinned;
    this.isMenuOpen = true;
    localStorage.setItem('menu-pinned', this.isMenuPinned.toString());
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

  initMenuBar(): void {
    const localStoragePinMenu = localStorage.getItem('menu-pinned');
    if (localStoragePinMenu === 'true') {
      this.isMenuPinned = true;
      this.isMenuOpen = true;
      return;
    }

    if (localStoragePinMenu === 'false') {
      this.isMenuPinned = false;
      this.isMenuOpen = false;
      return;
    }

    this.isMenuPinned = true;
    localStorage.setItem('menu-pinned', this.isMenuPinned.toString());
  }
}
