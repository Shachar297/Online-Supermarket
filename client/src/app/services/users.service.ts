import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessfulLoginServerResponse } from '../models/SuccessfullyLoginServerResponse';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { UserRegisterDetails } from '../models/UserRegisterDetails';
// import {HTTP}
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public userType : string; 
  public username : string;
  public cities : [];
  public socket : any;
  constructor(private http: HttpClient) {}

  public login(userLoginDetails: UserLoginDetails):
   Observable<SuccessfulLoginServerResponse> {
    return this.http.post<SuccessfulLoginServerResponse>(
      'http://localhost:3010/users/login', userLoginDetails
    );
  }

  public register(
    UserRegisterDetails: UserRegisterDetails
  ): Observable<SuccessfulLoginServerResponse> {
    return this.http.post<SuccessfulLoginServerResponse>(
      'http://localhost:3010/users/register',
      UserRegisterDetails
    );
  }

  public getCities():
Observable<any>{
  return this.http.get<any>
  ("http://localhost:3010/users/cities")
}

public countAllUsers():
Observable<number>{
  return this.http.get<number>(
    "http://localhost:3010/users/count"
  );
}

public getUserDetails():
Observable<any>{
  return this.http.get<any>(
    "http://localhost:3010/users/details/"
  )
}
}
