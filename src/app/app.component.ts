import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /* Contains the value whether the menu is opened yes or no */
  isMenuOpen = true;
  /*
    Contains the value whether the menu is pinned yes or no.
    Value is received from the EventEmitter in the SideMenu component.
  */
  isMenuPinned = false;

  constructor(
    public translate: TranslateService,
    private router: Router
  ) {
    this.initLanguage();
    this.initMenuBar();
  }

  /*
    Opens or closes the side bar.
  */
  onClickSideBar(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /*
    Sets the correct menu state based on the pinned state.
  */
  getMenuMode(): MatDrawerMode {
    return this.isMenuPinned ? 'side' : 'over';
  }

  /*
    Handles the changes when the pinned state changes.
    Write the new value to localstorage and force-open the menu.

    @param pinned: boolean
    The new value of the pinned state
  */
  onPinnedChange(pinned: boolean): void {
    if (this.isMenuPinned === pinned) {
      return;
    }

    this.isMenuPinned = pinned;
    this.isMenuOpen = true;
    localStorage.setItem('menu-pinned', this.isMenuPinned.toString());
  }

  /*
    Initialise the language services. Set all the supported languages and set default (fallback) language.
    Check if the localstorage contains a language value and try and use this value.
    If a non-existing value is stored, use the fallback language and override localstorage value.
  */
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

  /*
    Initialise the sidebar state.
    Check if the localstorage contains previously saved menu values and use those.
    If non-existing values are stored in the localstorage, use the default values and save to localstorage.
  */
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

    localStorage.setItem('menu-pinned', this.isMenuPinned.toString());
  }

  /*
    Returns translated page title for current route.
  */
  getTranslatedRoute(): string {
    let textToTranslate = 'APP.ROUTE.UNKNOWN_ROUTE';
    if (this.router.url.endsWith('products/add')) {
      textToTranslate = 'APP.ROUTE.ADD_PRODUCT';
    } else if (this.router.url.endsWith('products')) {
      textToTranslate = 'APP.ROUTE.PRODUCTS';
    } else if (this.router.url.endsWith('cart')) {
      textToTranslate = 'APP.ROUTE.CART';
    } else if (this.router.url.endsWith('catalog')) {
      textToTranslate = 'APP.ROUTE.CATALOG';
    } else if (this.router.url.endsWith('reservations')) {
      textToTranslate = 'APP.ROUTE.RESERVATIONS';
    } else if (this.router.url.endsWith('reservation')) {
      textToTranslate = 'APP.ROUTE.RESERVATION';
    }

    return this.translate.instant(textToTranslate);
  }
}
