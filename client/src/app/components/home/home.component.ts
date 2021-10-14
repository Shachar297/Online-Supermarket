import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/orderService';
import { StateService } from 'src/app/services/stateservice';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public orders : number;
  constructor(
    private router: Router,
    public stateService : StateService,
    private orderService : OrderService,
    private userService : UsersService) {}

  ngOnInit(): void {
    this.getAllOrders();
    this.countAllUsersRegistered();
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  getAllOrders(){
    let observable = this.orderService.getAllOrders();
    observable.subscribe(
      (orders) => {
        this.stateService.orders = orders;
        this.orders = orders[0].numOfOrders
        console.log(this.stateService.orders);
      },
      (failedToGetOrders) => {
        alert(failedToGetOrders.error.error)
      }
    )
  }

  countAllUsersRegistered(){
    let observable = this.userService.countAllUsers();
    observable.subscribe(
      (users) => {
        this.stateService.usersRegistered = users[0].users;
      },
      (failedToCount) => {
        alert(failedToCount.error.error)
      }
    )
  }
}
