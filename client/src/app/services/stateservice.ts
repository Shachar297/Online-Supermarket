import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetails } from '../models/OrderDetails';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public products: Product[] = [];
  public cities: [] = [];
  public items: Product[] = [];
  public orders : OrderDetails[] = [];
  public isAsideCollapsed: boolean = false;
  public price: number = 0;
  public quantity: number = 0;
  public username: string;
  public isUserLoggedIn: string = 'false';
  public socket : any;
  public productId : number;
  public singleProduct : Product;
  public isProductClicked : boolean = false;
  public categories : [] = [];
  public userType : string;
  public sum : number;
  public customerAction : string = "";
  public usersRegistered : number;
  public isCartExistsForCurrentUser : boolean = false;
  public isModalOpened: string = 'false';
  public isFirstOrder : boolean;
  // private items : Items
  constructor(private router : Router) {
    this.getItemDetailsFromSessionStorage();
    this.getUserDetails();
  
  }

  getItemDetailsFromSessionStorage() {
    if (
      sessionStorage.getItem('price') &&
      parseInt(sessionStorage.getItem('price')) != 0
      && this.price == 0
    ) {
      this.price = parseInt(sessionStorage.getItem('price'));
    }
    if (
      sessionStorage.getItem('quantity') &&
      parseInt(sessionStorage.getItem('quantity')) != 0
    ) {
      this.quantity = parseInt(sessionStorage.getItem('quantity'));
    }
  }

  public getUserDetails() {
    if (sessionStorage.getItem('username')) {
      this.username = sessionStorage.getItem('username');
      this.isUserLoggedIn = 'true';

    } else {
      this.username = 'אורח';
    }
    if(sessionStorage.getItem("userType")){
      this.userType = sessionStorage.getItem("userType");
    }
  }

  public getUserstate(value) {
    this.isUserLoggedIn = value.toString();
    sessionStorage.setItem('isUserLoggedIn', value);
    console.log(this.isUserLoggedIn , typeof(this.isUserLoggedIn));
  }

  onLogout(){
    this.socket.disconnect();
    sessionStorage.clear();
    this.getUserstate(false);
    this.router.navigate(["/login"]);
    console.log(this.isUserLoggedIn)
    }

   public setModalStateInSessionStorage(value : boolean){
    sessionStorage.setItem('isModalOpened' , value.toString());
    this.isModalOpened = sessionStorage.getItem("isModalOpened");
    }
}
