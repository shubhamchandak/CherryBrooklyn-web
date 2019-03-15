import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { OrderItem } from "src/app/models/orderItem";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  orderItems: OrderItem[] = [];
  totalAmount: number;
  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.orderItems = this.cartService.orderItems;
  }

  getCartItems(): OrderItem[] {
    return this.cartService.orderItems.filter(x => x.quantity > 0);
  }
}
