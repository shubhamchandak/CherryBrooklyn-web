import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'https://cherrybrooklyn-api.herokuapp.com/products';
  // apiUrl = "http://localhost:3000/products";
  products: Product[] = [];
  productCount = 0;

  constructor(private httpClient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json'
    })
  };

  getProducts(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl, this.httpOptions);
  }


}
