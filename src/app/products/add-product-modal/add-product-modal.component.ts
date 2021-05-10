import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent implements OnInit, OnDestroy{

  addProductUrl = 'api/products/';
  subscription = new Subscription();

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    console.log('-----modal-----');
  }

  addProduct(form: NgForm) {
    console.log('Your form data : ', form.value);
    this.subscription.add(
      this.api.postTypeRequest(this.addProductUrl, form.value).subscribe((res: any) => {
        if (res['status'] == 200) {
            console.log(res)
        } else {
            console.log(res)
        }
      }, err => {
      console.log(err['error'].message);
    }));
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

}
