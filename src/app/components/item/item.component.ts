import { Component, OnInit, Input } from "@angular/core";

import {IItem} from "../../interfaces/IItem";
import { CartService } from 'src/app/services/cart.service';


@Component({
    selector: "app-item",
    templateUrl: "./item.component.html",
    styleUrls: ["./item.component.css"]
})

export class ItemComponent implements OnInit{

    @Input() item: IItem;

    constructor(private cartService: CartService) {

    }

    ngOnInit() {

    }

    orderCountChanged(event: {orderCount: number, isAdded: boolean}) {
        if (event.isAdded) {
            // this.orderService.addItemInCart(event.orderCount, this.item);
            if (this.cartService.orderItems.includes(this.item)) {
                console.log(this.item);
                this.cartService.orderItems.map(x => {
                    if (x._id === this.item._id) {
                        x.quantity++;
                    }
                });
            } else {
                const orderItem: IItem = this.item;
                orderItem.quantity = 1;
                console.log(orderItem);
                this.cartService.orderItems.push(this.item);
            }
            this.cartService.updateTotalAmount();
        } else {
            this.cartService.orderItems.map(x => {
                if (x._id === this.item._id) {
                    if (x.quantity > 0) {
                        x.quantity--;
                        this.cartService.updateTotalAmount();
                    }
                }
            });
        }
    }
}
