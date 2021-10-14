import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { categoriesService } from 'src/app/services/categories.service';
import { itemService } from 'src/app/services/item.service';
import { SocketService } from 'src/app/services/socket.service';
import { StateService } from 'src/app/services/stateservice';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  public userType: string;
  public y = window.scrollY;
  public isHovered: boolean = false;
  // public userType : string = sessionStorage.getItem("userType");
  @Input()
  quantity: number = 0;

  @Input()
  name: string;

  @Input()
  price: number;

  @Input()
  image: string;

  @Input()
  productId: number;

  @Input()
  product: any;

  @Input()
  isModalOpened: boolean = false;

  @Output() childEvent = new EventEmitter<number>();

  @Output() childEventRemoveItem = new EventEmitter<number>();

  @Output() childEventEditItem = new EventEmitter<number>();
  constructor(
    private stateService: StateService,
    private socketService : SocketService,
    private itemService : itemService,
    private router : Router
  ) {}
  ngOnInit(): void {
    this.userType = sessionStorage.getItem('userType');
    // this.getAllCategories();
  }
  addToCart(product : any) {
    console.log(product)

  }

  removeItem() {
    this.childEventRemoveItem.emit(this.productId);
  }

  editItem() {
    this.setPriceAndQuantity();
    this.setInSessionStorage();
    console.log(this.quantity)
    this.childEventEditItem.emit(this.productId);
    this.router.navigate(["/product/" + this.productId])
    }


  connectSocket(){
    this.socketService.listen("ADD_ITEM").subscribe(res => {
      console.log(res , "res");
    })
  }

  openAndCloseModal() {
    this.setPriceAndQuantity();
    this.setInSessionStorage();
    console.log(this.quantity , "!Q!")
    this.router.navigate(["/product/" + this.productId])
    this.stateService.isCartExistsForCurrentUser = true;
  }

  public increacePeices() {
    this.quantity++;
  }

  public decreacePerices() {
    this.quantity--;
  }

  onMouseEnter() {
    this.isHovered = true;
    setTimeout(() =>this.onMouseLeave() , 1500);
  }

  onMouseLeave() {
    this.isHovered = false;
  }

  setInSessionStorage(){
    sessionStorage.setItem("quantity" , this.quantity.toString());
    sessionStorage.setItem("price" , this.price.toString());
    console.log(this.quantity , "qqq")
  }

  setPriceAndQuantity(){
    this.stateService.quantity = this.quantity;
    this.stateService.price = this.price;
  }

  onProductCardClick(){
    console.log(this.product)
    if(this.userType == "ADMIN"){
      this.stateService.productId = this.product.id;
      this.stateService.singleProduct = this.product;
      this.stateService.isProductClicked = true;
    }
  }
}
