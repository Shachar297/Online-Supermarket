import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { itemService } from 'src/app/services/item.service';
import { productService } from 'src/app/services/product.service';
import { StateService } from 'src/app/services/stateservice';

@Component({
  selector: 'app-productid',
  templateUrl: './productid.component.html',
  styleUrls: ['./productid.component.css'],
})
export class ProductidComponent implements OnInit {
  private id: number;
  public product: Product;
  public userType: string;
  public quantity: number = 0;
  public price : number = 0;
  constructor(
    private productService: productService,
    private route: ActivatedRoute,
    public itemService: itemService,
    public stateService : StateService,
    private router : Router
  ) {

  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getProduct();
    this.userType = sessionStorage.getItem('userType');
    this.quantity = this.stateService.quantity;
    this.price = this.stateService.price;
  }

  getProduct() {
    let observable = this.productService.getProductById(this.id);
    observable.subscribe(
      (product) => {
        // this.product = product;
        this.product = new Product(
          product[0].id,
          product[0].name,
          product[0].category_id,
          product[0].price ,
          product[0].image_url,
          this.quantity,
          this.id
        );
        console.log(this.product);
      },
      (failure) => {}
    );
  }

  saveChangesOnCurrentProduct() {
    console.log(this.product);
    let observable = this.productService.editProduct(this.product);
    observable.subscribe(
      (updatedSuccesfully) => {
        alert('yessss');
      },
      (failedToUpdate) => {
        alert(failedToUpdate.error.error);
      }
    );
  }

  addItemToCart() {
    let observable = this.itemService.addItemToCart(this.product);
    observable.subscribe(
      (success) => {
        this.stateService.items.push(this.product)
        console.log(this.product , "pro")
        this.onCancel();
      },
      (failure) => {
        alert(failure.error.error);
      }
    );
  }

  purchaseItem() {
    let observable = this.itemService.addItemToCart(this.product);
    observable.subscribe(
      (addedToCart) => {
        this.stateService.items.push(this.product);
    this.router.navigate(["/orders"])

      },
      (failedToAddItem) => {
alert(failedToAddItem.error.error)
      }
    )
  }

  onCancel() {
    this.router.navigate(["/products"]);
  }


}
