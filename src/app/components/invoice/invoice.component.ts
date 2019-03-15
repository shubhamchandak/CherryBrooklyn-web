import { Component, OnInit } from "@angular/core";
import { OrderItem } from "../../models/orderItem";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.css"]
})
export class InvoiceComponent implements OnInit {
  constructor(private cartService: CartService) {}

  deliveryCharges = this.cartService.deliveryCharges;
  totalAmount = this.cartService.totalAmount;

  ngOnInit() {}

  getOrderItems(): OrderItem[] {
    return this.cartService.orderItems.filter(x => x.quantity > 0);
  }
}
