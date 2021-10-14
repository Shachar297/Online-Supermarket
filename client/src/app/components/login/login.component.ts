import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { OrderService } from 'src/app/services/orderService';
import { StateService } from 'src/app/services/stateservice';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { categoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public userLoginDetails = new UserLoginDetails('', '');

  public formLoginGroup: FormGroup;
  public usernameFormControl: FormControl;
  public passwordFormControl: FormControl;

  constructor(
    private userService: UsersService,
    private router: Router,
    public stateService: StateService,
    private categoryService : categoriesService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.usernameFormControl = new FormControl('', [
      Validators.required,
     
    ]);
    this.passwordFormControl = new FormControl('', Validators.required);

    // Initializing the from group
    this.formLoginGroup = new FormGroup({
      username: this.usernameFormControl,
      password: this.passwordFormControl,
    });
    console.log(this.formLoginGroup)
  }

alignLoginDetails(){
  this.userLoginDetails.password = this.passwordFormControl.value;
  this.userLoginDetails.username = this.usernameFormControl.value;
}

  public login(): void {
    this.alignLoginDetails();
    let observable = this.userService.login(this.userLoginDetails);
    console.log(this.formLoginGroup)
    observable.subscribe(
      (successfullServerResponse) => {
        this.stateService.getUserstate(true);
        this.handleUserDetails(successfullServerResponse);
        this.getUserToPageByUserType(successfullServerResponse);
        this.getAllCategories();
      },
      (failure) => {
        alert(failure.error.error);
        console.error(failure);
      }
    );
  }
  private getUserToPageByUserType(successfullServerResponse: any) {
    if (successfullServerResponse.userType == 'ADMIN') {
      this.router.navigate(['admin']);
    } else if (successfullServerResponse.userType == 'CUSTOMER') {
      console.log(successfullServerResponse.userType);
      this.router.navigate(['products']);
    } else {
      console.log(successfullServerResponse.userType);
      this.router.navigate(['company']);
    }
  }

  handleUserDetails(successfullServerResponse: any) {
    sessionStorage.setItem('token', successfullServerResponse.token + '');
    sessionStorage.setItem('userType', successfullServerResponse.userType);
    sessionStorage.setItem('username', this.userLoginDetails.username);
    this.stateService.userType = successfullServerResponse.userType;
    this.stateService.username = this.userLoginDetails.username;
  }

  isUserOrderedBefore() {
    let observable = this.orderService.isUserOrderedBefore();
    observable.subscribe(
      (answer) => {
        console.log(answer);
        this.stateService.isFirstOrder = answer;
      },
      (failedToGetAnswer) => {
        alert(failedToGetAnswer.error.error);
      }
    );
  }
  private getAllCategories() {
    let observable = this.categoryService.getAllCategories();
    observable.subscribe(
      (categoriesArray) => {
        this.stateService.categories = categoriesArray;
      },
      (failed) => {
        alert('no');
      }
    );
  }
  goRegister(){
    this.router.navigate(["register"])
  }
}
