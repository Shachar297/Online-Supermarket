import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrderDetails } from '../models/OrderDetails';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public constructor(private http: HttpClient) {}


  public order(orderDetails : OrderDetails):
  Observable<any>{
      return this.http.post<any>(
          "http://localhost:3010/orders/" , orderDetails
      )
  }

  public getAllOrders():
  Observable<OrderDetails[]>{
    return this.http.get<OrderDetails[]>(
      "http://localhost:3010/orders/"
    );
  }

  public isUserOrderedBefore():
  Observable<boolean>{
    return this.http.get<boolean>(
      "http://localhost:3010/orders/byId/"
    )
  }
}
