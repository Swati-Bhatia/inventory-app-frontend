import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllProductsComponent } from './all-products/all-products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';

@NgModule({
  declarations: [
    AllProductsComponent,
    ProductDetailComponent,
    AddProductModalComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class ProductsModule { }
