import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { productService } from 'src/app/services/product.service';
import { itemService } from 'src/app/services/item.service';
import { categoriesService } from 'src/app/services/categories.service';
import { io, Socket } from 'socket.io-client';
import { UsersService } from 'src/app/services/users.service';
import { SocketService } from 'src/app/services/socket.service';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/stateservice';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public products: Product[] = new Array();
  // public pipedCategories: Product[] = new Array();
  public categoryId: number;
  public searchInputValue: string;

  constructor(
    private productService: productService,
    private itemService: itemService,
    private categoriesService: categoriesService,
    private socketService: SocketService,
    public stateService: StateService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    this.getAllItemsForCurrentUser();
    this.isCartExistsForCurrentUser();
  }

  public getAllProducts = async () => {
    let observable = this.productService.getAllProducts();
    observable.subscribe(
      (success) => {
        console.log(success);
        this.products = success;
        this.productService.products = success;
        this.stateService.products = success;
        this.connectSocket();

        console.log(this.productService.products);
      },
      (failure) => {}
    );
  };

  private getAllCategories() {
    let observable = this.categoriesService.getAllCategories();
    observable.subscribe(
      (categoriesArray) => {
        this.stateService.categories = categoriesArray;
      },
      (failed) => {
        alert('no');
      }
    );
  }

  connectSocket() {
    this.socketService.listen('EDIT_PRODUCT').subscribe((res) => {
      console.log(res, '!');
    });

    this.socketService.listen('ADD_ITEM').subscribe((res) => {
      console.log(res, 'res');
    });
  }

  selectCategory(event: any) {
    if (event.value != 'all Products') {
      this.categoryId = event.value;
      let observable = this.categoriesService.getCategoryByName(event.value);
      observable.subscribe(
        (productsPipedByCategories) => {
          this.stateService.products = productsPipedByCategories;
          // console.log(this.pipedCategories)
        },
        (no) => {}
      );
    } else if (event.value == 'all Products') {
      this.stateService.products = this.products;
    }
  }

  searchProductByName() {
    if (this.searchInputValue.length != 0) {
      let observable = this.productService.getProductByName(
        this.searchInputValue
      );
      observable.subscribe(
        (product) => {
          console.log(product);
          this.stateService.productId = product.id;
          this.stateService.products = product;
          this.searchInputValue = '';
        },
        (failed) => {
          alert(failed.error.error);
        }
      );
    }
  }

  private getAllItemsForCurrentUser() {
    let observable = this.itemService.getAllItemsForCurrentUser();
    observable.subscribe(
      (itemsArr: Product[]) => {
        this.stateService.items = itemsArr;
      },
      (failure) => {
        alert(failure);
      }
    );
  }



  public isCartExistsForCurrentUser() {
    if(this.stateService.isCartExistsForCurrentUser){
      return;
    }
    let observable = this.cartService.isCartExistsForCurrentUser();
    observable.subscribe(
      (answer) => {
        this.stateService.isCartExistsForCurrentUser = answer;
        this.stateService.setModalStateInSessionStorage(answer)
      },
      (failed) => {
        console.error(failed.error.error, failed);
      }
    );
  }
  openAndCloseModal() {
    // this.setPriceAndQuantity();
    // this.setInSessionStorage();
    // console.log(this.quantity , "!Q!")
    // this.router.navigate(["/product/" + this.product.id])
  }
}
