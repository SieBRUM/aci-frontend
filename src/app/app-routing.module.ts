import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAddProductPageComponent } from './app-add-product-page/app-add-product-page.component';
import { AppHomePageComponent } from './app-home-page/app-home-page.component';
import { AppReservationActionPageComponent } from './app-reservation-action-page/app-reservation-action-page.component';
import { AppShoppingCartPageComponent } from './app-shopping-cart-page/app-shopping-cart-page.component';
import { InventoryComponent } from './inventory/inventory.component';

/*
  All routing locations of the application.
  Always redirect to Home when a non-existing routed are hit.
*/
const routes: Routes = [
  { path: 'home', component: AppHomePageComponent },
  { path: 'cart', component: AppShoppingCartPageComponent },
  { path: 'products/add', component: AppAddProductPageComponent },
  { path: 'products', component: InventoryComponent },
  { path: 'reservation', component: AppReservationActionPageComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
