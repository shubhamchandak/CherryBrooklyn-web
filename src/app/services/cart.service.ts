import { Injectable } from '@angular/core';
import { OrderItem } from '../models/orderItem';
import { IItem } from '../interfaces/IItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  orderItems: IItem[] = [];
  // cartItems: IItem[] = [];
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
