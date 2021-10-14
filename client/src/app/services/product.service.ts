import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class productService {
  public products: Product[];
  public constructor(private http: HttpClient) {
    this.products = [];
  }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3010/products/');
  }

  public getProductById(productId : number): Observable<any>{
    return this.http.get<any>("http://localhost:3010/products/" + productId)
  }

  public editProduct(product : Product): Observable<any>{
    return this.http.put<any>("http://localhost:3010/products/" + product.id , product)
  }

  public getProductByName(productName : string): Observable<any>{
    return this.http.get<any>(
      "http://localhost:3010/products/byName/" + productName
      )
  }

  public createNewProduct(product : Product): Observable<any>{
    return this.http.post("http://localhost:3010/products/" , product);
  }

}
