import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class itemService {
  public items: Product[] = [];
  public constructor(private http: HttpClient) {}

  public getAllItemsForCurrentUser(): Observable<any> {
    return this.http.get<any>('http://localhost:3010/item/');
  }

  public addItemToCart(product: any): Observable<any> {
    
    return this.http.post<any>('http://localhost:3010/item/', product);
  }

  public removeItemFromCart(productId: number): Observable<any> {
    return this.http.delete<any>('http://localhost:3010/item/' + productId);
  }

  public removeAllItemsForCurrentUser(): Observable<any> {
    return this.http.delete<any>('http://localhost:3010/item/');
  }
}
