import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order } from '../models/order';
import { OtpItem } from '../models/otp-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = 'https://cherrybrooklyn-api.herokuapp.com/orders';
  // apiUrl = 'http://localhost:3000/orders';
  currentOrder: Order;
  confirmOrderId: any;

  constructor(
    private httpClient: HttpClient
  ) { }

    private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json'
    })
  };

  submitOrder(order: Order): Observable<any> {
    this.currentOrder = order;
    return this.httpClient.post<any>(this.apiUrl, { order }, this.httpOptions);
  }

  updateOrderStatus(otpItem: OtpItem): Observable<any> {
    return this.httpClient.patch<any>(this.apiUrl + `/${otpItem.orderId}`, { otpItem }, this.httpOptions);
  }
}
