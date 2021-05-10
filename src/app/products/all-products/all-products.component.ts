import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit, OnDestroy {
  productsUrl = 'api/products/';
  subscription = new Subscription();
  productList;
  title = 'appBootstrap';
  closeResult: string;
  constructor(private api: ApiService,private router: Router, private auth: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getProductList();
  }

  // get product list from products table
  public getProductList() {
    this.subscription.add(
      this.api.getTypeRequest(this.productsUrl).subscribe(res => {
        if (res['status'] == 200) {
          this.productList = res['data'];
        } else {
          console.log('Not Data found.');
        }
      }));
  }


public updateProduct(id, productName) {
  if (confirm('Are you sure want to remove product ' + productName + ' ? ')) {
    this.subscription.add(
    this.api.putTypeRequest(this.productsUrl + '' + id).subscribe(res => {
      if (res['status'] == 200) {
        this.api.getTypeRequest(this.productsUrl).subscribe(res => {
          if (res['status'] == 200) {
            this.productList = res['data'];
          } else {
            console.log('Not Data found.');
          }
        })
      }
    })
    );
  }
}

public viewProductDetails(id) {
  console.log('here', id);
  this.router.navigate(['products/' + id]);
}

logout() {
  this.auth.logoutUser();
}

open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}