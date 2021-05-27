import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { AppHomePageComponent } from './app-home-page/app-home-page.component';
import { AppSideMenuBarComponent } from './app-side-menu-bar/app-side-menu-bar.component';
import { AppAddProductPageComponent } from './app-add-product-page/app-add-product-page.component';
import { AppProductDatepickerComponent } from './app-product-datepicker/app-product-datepicker.component';
import { AppShoppingCartPageComponent } from './app-shopping-cart-page/app-shopping-cart-page.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AppArchiveDialogComponent } from './app-archive-dialog/app-archive-dialog.component';
import { StatusNameKeyPipe } from './pipes/status-name-key.pipe';
import { StatusNameClassPipe } from './pipes/status-name-class.pipe';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlFactory } from './factories/paginatorI18n.factory';
import { HttpLoaderFactory } from './factories/http-loader.factory';
import { AppInventoryPageComponent } from './app-inventory-page/app-inventory-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHomePageComponent,
    AppSideMenuBarComponent,
    AppAddProductPageComponent,
    AppProductDatepickerComponent,
    AppShoppingCartPageComponent,
    AppInventoryPageComponent,
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
  providers: [
    {
      provide: MatPaginatorIntl, deps: [TranslateService],
      useFactory: MatPaginatorIntlFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
