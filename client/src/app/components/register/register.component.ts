import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegisterDetails } from 'src/app/models/UserRegisterDetails';
import { StateService } from 'src/app/services/stateservice';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public userRegisterDetails = new UserRegisterDetails('', '', '', '', '', '');
  public isNextPageButton : boolean = false; 
  public validatePassword : string;
  // form group / control
  public registerFormGroup: FormGroup;
  public usernameFormControl: FormControl;
  public passwordFormControl: FormControl;
  public validatePasswordFormControl: FormControl;
  public identityNumberFormControl : FormControl;
  public cityFormControl : FormControl;
  public streetFormControl : FormControl;
// ---
  constructor(
    private userService: UsersService,
    public stateService: StateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requireInputs();
  
    this.userRegisterDetails.userType = 'CUSTOMER';
    this.getCities();
  }

  private requireInputs(){
    this.registerFormGroup = new FormGroup ({
    username : this.usernameFormControl = new FormControl("" , [
        Validators.required, Validators.minLength(2), Validators.maxLength(22)
      ]),
    password :  this.passwordFormControl = new FormControl("" , [
        Validators.required,Validators.minLength(5), Validators.maxLength(18)
      ]),
    validatePassword :  this.validatePasswordFormControl = new FormControl("", [
        Validators.required,Validators.minLength(5), Validators.maxLength(18)
      ]),
     identityNumber : this.identityNumberFormControl = new FormControl("" , [
        Validators.required, Validators.pattern("^[0-9]*$"),
         Validators.minLength(7), Validators.maxLength(7)
      ]),
      streetAdress : this.streetFormControl = new FormControl("", [
        Validators.required
      ]),
    cityName :  this.cityFormControl = new FormControl("" , [
        Validators.required,Validators.minLength(2)
      ])
    })

  }

  private alignInputsToFormGroup(){
    this.userRegisterDetails.username = this.usernameFormControl.value;
   this.userRegisterDetails.password = this.passwordFormControl.value;
    // this.userRegisterDetails this.validatePasswordFormControl
    this.userRegisterDetails.identityNumber = this.identityNumberFormControl.value;
    this.userRegisterDetails.street = this.streetFormControl.value;
    this.userRegisterDetails.city = this.cityFormControl.value;
  }

  public register(): void {
    this.alignInputsToFormGroup();
    let observable = this.userService.register(this.userRegisterDetails);
    console.log(this.userRegisterDetails);
    observable.subscribe(
      (successfullServerResponse) => {
        this.stateService.getUserstate(true);
        console.log(successfullServerResponse)
        this.handleUserDetails(successfullServerResponse)
        this.router.navigate(["/products"])
      },
      (failure) => {
        alert(failure.error.error);
        console.error(failure.error.error);
      }
    );
  }
  public chooseCity(event: any) {
    console.log(event.value);
  }

  getCities() {
    let observable = this.userService.getCities();
    observable.subscribe(
      (cities) => {
        this.stateService.cities = cities;
      },
      (failed) => {
        alert('Sorry.');
      }
    );
  }

  onNextPage(){
    console.log(this.registerFormGroup)
    this.isNextPageButton = true;
  }

  handleUserDetails(successfullServerResponse: any) {
    sessionStorage.setItem('token', successfullServerResponse.token + '');
    sessionStorage.setItem('userType', successfullServerResponse.userType);
    sessionStorage.setItem('username', this.userRegisterDetails.username);
    this.stateService.userType = successfullServerResponse.userType;
    this.stateService.username = this.userRegisterDetails.username;
  }

onBack(){
  this.isNextPageButton = false;
}

}
