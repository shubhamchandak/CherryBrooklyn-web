import { Injectable } from '@angular/core';
import { OrderItem } from '../models/orderItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  orderItems: OrderItem[] = [];
  totalAmount: number;
  deliveryCharges: number;

  constructor() { }

  updateTotalAmount() {
    this.totalAmount = 0;
    this.deliveryCharges = 0;
    this.orderItems.map(x => {
      this.totalAmount += (x.price * x.quantity);
    });
  }
}
