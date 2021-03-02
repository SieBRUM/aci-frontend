import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHomePageComponent } from './app-home-page/app-home-page.component';

const routes: Routes = [
  { path: 'home', component: AppHomePageComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
