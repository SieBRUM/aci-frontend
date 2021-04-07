import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppHomePageComponent } from './app-home-page/app-home-page.component';
import { AppSideMenuBarComponent } from './app-side-menu-bar/app-side-menu-bar.component';
import { AppAddProductPageComponent } from './app-add-product-page/app-add-product-page.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LayoutModule } from '@angular/cdk/layout';
import { StatusNameKeyPipe } from './status-name-key.pipe';
import { StatusNameClassPipe } from './status-name-class.pipe';
import { AppArchiveDialogComponent } from './app-archive-dialog/app-archive-dialog.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    AppHomePageComponent,
    AppSideMenuBarComponent,
    AppAddProductPageComponent,
    InventoryComponent,
    StatusNameKeyPipe,
    StatusNameClassPipe,
    AppArchiveDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
