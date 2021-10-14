import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OrderDetails } from 'src/app/models/OrderDetails';
import { UserRegisterDetails } from 'src/app/models/UserRegisterDetails';
import { itemService } from 'src/app/services/item.service';
import { OrderService } from 'src/app/services/orderService';
import { StateService } from 'src/app/services/stateservice';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  public orderDetails = new OrderDetails('', '', '', 0);
  public username: string;
  public file : any;
  public isModalOpened : boolean = false;
  public details : any
  constructor(
    private orderService: OrderService,
    private router: Router,
    private usersService: UsersService,
    public stateService: StateService,
    private itemService: itemService,
    private sanitizer: DomSanitizer,
    
  ) {
    this.details = {
      city : "",
      street : ""
    }
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.getAllItemsForCurrentUser();
    this.getCitiesConditional();
    this.getUserDetails();
  }

  private getAllItemsForCurrentUser() {
    let observable = this.itemService.getAllItemsForCurrentUser();
    observable.subscribe(
      (itemsArr) => {
        this.stateService.items = itemsArr;
      },
      (failure) => {
        alert(failure);
      }
    );
  }

  onOrder() {
    console.log(this.orderDetails);
    let observable = this.orderService.order(this.orderDetails);
    observable.subscribe(
      (purchased) => {
        this.isModalOpened = true;
        this.generateFile(purchased);
        this.removeAllItems();
      },
      (failed) => {
        this.isModalOpened = false;
        alert(failed.error.error);
        console.log('no');
      }
    );
  }

  generateFile(purchased: any) {
    const file = {
      
      userDetails: purchased.userDetails.userDetails,
      product: {
        date: purchased.orderDetails.date,
        city: purchased.orderDetails.city,
        street : purchased.orderDetails.street,
        total: purchased.orderDetails.total,
      },
    };
    const textFile = `שלום , ${file.userDetails} \n
     הזמנתך על סך ${file.product.total} התבצעה בהצלחה . 
     \n עיר למשלוח : ${file.product.city} \n 
     שם רחוב : ${file.product.street} \n
     תאריך משוער : ${file.product.date}`
    const blob = new window.Blob([textFile], { type: 'application/octet-stream' });
    this.file = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  onCancel() {
    this.router.navigate(['/products']);
  }

  getAllCities() {
    let observable = this.usersService.getCities();
    observable.subscribe(
      (cities) => {
        console.log(cities);
        this.stateService.cities = cities;
      },
      (fail) => {
        alert('Sorry.');
      }
    );

  }

  changeCity(event: any) {
    if (event.value) {
      this.orderDetails.city = event.value;
      console.log(event.value);
    }
  }

  private getCitiesConditional() {
    if (this.stateService.cities.length) {
      console.log(this.stateService.cities);
    } else {
      this.getAllCities();
      console.log(this.stateService.cities);
    }
  }

  calculateTotal() {
    let total = 0;
    for (let i of this.stateService.items) {
      total += i.price;
    }
    this.orderDetails.total = total;
    return total;
  }

  public emptyUserCart() {
    console.log('empty');
    let observable = this.itemService.removeAllItemsForCurrentUser();
    observable.subscribe(
      (removed) => {
        this.getAllItemsForCurrentUser();
      },
      (failed) => {}
    );
  }

  onHome(){
this.router.navigate(["/products"])
  }

  removeAllItems(){
    let observable = this.itemService.removeAllItemsForCurrentUser();
    observable.subscribe(
      (itemRemoved) => {
        console.log(itemRemoved);
      },
      (failed) => {

      }
    )
  }

  getUserDetails(){
      let observable = this.usersService.getUserDetails();
      observable.subscribe(
        (userDetails) => {
this.details.city = userDetails[0].city;
this.details.street = userDetails[0].street;
        },
        (failedToGetDetailsFromUser) => {
          alert(failedToGetDetailsFromUser.error.error);
        }
      )
  }

setUserCity(event : any){
this.orderDetails.city = this.details.city;
// console.log(this.details.city)
event.value = this.orderDetails.city
this.changeCity(event)
}

serUserStreet(){
  this.orderDetails.street = this.details.street;
  console.log(this.orderDetails.street)
}

}
