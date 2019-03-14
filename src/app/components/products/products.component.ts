import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/product';
import { OrderItem } from 'src/app/models/orderItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  products: Product[] = [];

  ngOnInit() {
    if (this.productService.products.length === 0) {
      this.productService.getProducts().subscribe(data => {
        this.productService.products = data.product;
        this.productService.productCount = data.count;
        this.products = this.productService.products;
        if (this.products.length > 0) {
          this.products.map(x => {
            const orderItem: OrderItem = {
              productId: x._id,
              quantity: 0,
              name: x.name,
              price: x.price
            };
            this.cartService.orderItems.push(orderItem);
          });
        }
      },
      error => {
        console.log(error);
      });
    }
    this.products = this.productService.products;
  }

  incrementQuantity(productId) {
    this.cartService.orderItems.map(x => {
      if (x.productId === productId) {
        x.quantity++;
        this.cartService.updateTotalAmount();
      }
    });

  }

  decrementQuantity(productId) {
    this.cartService.orderItems.map(x => {
      if (x.productId === productId) {
        if (x.quantity > 0) {
          x.quantity--;
          this.cartService.updateTotalAmount();
        }
      }
    });
  }

  displayQuantity(productId) {
    const index = this.cartService.orderItems.findIndex(x => x.productId === productId);
    return this.cartService.orderItems[index].quantity;
  }
}
