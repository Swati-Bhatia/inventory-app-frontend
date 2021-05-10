import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent } from './auth/login/login.component';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'products/:id', component: ProductDetailComponent
  },
  {
    path: 'products', component: AllProductsComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '**',  redirectTo: 'login'
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
