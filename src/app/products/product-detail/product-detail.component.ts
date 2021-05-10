import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productsUrl = 'api/products/';
  subscription = new Subscription();
  url;
  productDetails;
  productId;
  constructor(private api: ApiService,private router: Router) { }

  ngOnInit(): void {
    console.log('coming');
    this.getProductDetail();

  }

  // get product list from products table
  public getProductDetail() {
    this.productId = this.router.url.split('/')[2];
    console.log(this.productId);
    this.subscription.add(
      this.api.getTypeRequest(this.productsUrl + '' + this.productId).subscribe(res => {
        if (res['status'] == 200) {
          this.productDetails = res['data'][0];
          console.log(this.productDetails);
        } else {
          console.log('Not Data found.');
        }
      }));
  }

}
