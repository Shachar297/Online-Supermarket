import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  public isCartExistsForCurrentUser():
  Observable<boolean>{
    return this.http.get<boolean>(
      "http://localhost:3010/cart/"
    )
  }
}
