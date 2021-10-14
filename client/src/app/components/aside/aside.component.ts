import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { categoriesService } from 'src/app/services/categories.service';
import { itemService } from 'src/app/services/item.service';
import { productService } from 'src/app/services/product.service';
import { StateService } from 'src/app/services/stateservice';
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit {
  public elementClicked: string;
  public product = new Product(0, '', 0, 0, '');
  public isHovered: boolean = false;
  public action: string = 'edit product';

  private isItems : boolean = false;
  private categoryId: number;
  constructor(
    private itemService: itemService,
    public StateService: StateService,
    private productService: productService,
    private categoriesService: categoriesService,
    private router: Router
  ) {
    // this.setUsernameOnSideBar();
   
  }

  ngOnInit(): void {
    this.StateService.getUserDetails();
  }

  private getAllItemsForCurrentUser() {
    let observable = this.itemService.getAllItemsForCurrentUser();
    observable.subscribe(
      (itemsArr: Product[]) => {
        this.StateService.items = itemsArr;

        if (this.StateService.items.length > 0) {
          this.calcTotal();
        }
      },
      (failure) => {
        alert(failure);
      }
    );
  }

  public removeItemFromCart(id: number) {
    let observable = this.itemService.removeItemFromCart(id);
    observable.subscribe(
      (removed) => {
        this.getAllItemsForCurrentUser();
      },
      (failed) => {
        alert(failed.error.error);
      }
    );
  }

  public emptyUserCart() {
    let observable = this.itemService.removeAllItemsForCurrentUser();
    observable.subscribe(
      (removed) => {
        this.getAllItemsForCurrentUser();
      },
      (failed) => {}
    );
  }

  onOrder() {
    this.router.navigate(['/orders']);
  }

  onSaveProductDetails() {
    let observable = this.productService.editProduct(
      this.StateService.singleProduct
    );
    observable.subscribe(
      (updatedSuccesfully) => {
        alert('yessss');
      },
      (failedToUpdate) => {
        alert(failedToUpdate.error.error);
      }
    );
  }

  onFullScreen() {
    if (this.action == 'add product') {
      this.router.navigate(['admin/addProduct']);
    }
    this.router.navigate(['/product/' + this.StateService.singleProduct.id]);
  }

  onCloseAdminSidePanel() {
    this.StateService.isProductClicked = false;
    this.router.navigate(["/admin"])
  }
  onAddProduct() {
    this.action = 'add product';
  }
  onEditProduct() {
    this.action = 'edit product';
  }


  selectCategory(event: any) {
    if (event.value != 'all Products') {
      this.categoryId = event.value;
      let observable = this.categoriesService.getCategoryByName(event.value);
      observable.subscribe(
        (category) => {},
        (failedToLoad) => {
          alert(failedToLoad.error.error);
        }
      );
    } else if (event.value == 'all Products') {
      // this.StateService.products = this.products;
    }
  }

  onAddProductClicked() {
    
    let observable = this.productService.createNewProduct(this.product);
    observable.subscribe(
      (succsess) => {
        alert('yes');
      },
      (failed) => {
        alert(failed.error.error);
      }
    );
  }

  calcTotal() {
    let sum: number = 0;
    for (let i of this.StateService.items) {
      sum += i.price;
    }
    this.StateService.sum = sum;
  }

  goRegister(){
    this.router.navigate(['/register'])
  }

  goLogin(){
    this.router.navigate(['/login'])
  }
}



// admin/addProduct