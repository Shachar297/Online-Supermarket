import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class categoriesService {
  public constructor(private http: HttpClient) {}

  public getAllCategories(): Observable<any> {
    return this.http.get<any>('http://localhost:3010/categories/');
  }

  public getCategoryByName(keyWord : any):
  Observable<any>{
      return this.http.get<any>(
        'http://localhost:3010/categories/' + keyWord
      )
  }
}
