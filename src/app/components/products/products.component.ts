import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/product';
import { OrderItem } from 'src/app/models/orderItem';
import { CartService } from 'src/app/services/cart.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IItem } from 'src/app/interfaces/IItem';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  shakes: any = [];
  juices: any = [];
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private loaderService: NgxUiLoaderService
  ) { }

  products: IItem[] = [];

  ngOnInit() {
    if (this.productService.products.length === 0) {
      this.loaderService.start();
      this.productService.getProducts().subscribe(data => {
        this.productService.products = data.product;
        this.shakes = data.product.filter(a => a.type === 1);
        this.juices = data.product.filter(b => b.type === 2);
        this.productService.productCount = data.count;
        this.products = this.productService.products;
        if (this.products.length > 0) {
          this.products.map(x => {
            const orderItem: IItem = {
              _id: x._id,
              quantity: 0,
              name: x.name,
              price: x.price,
              status: x.status,
              type: x.type,
              discount: x.discount
            };
            this.cartService.orderItems.push(orderItem);
            this.loaderService.stop();
          });
        }
      },
      error => {
        console.log(error);
        this.loaderService.stop();
      });
    }
    this.products = this.productService.products;
  }

  incrementQuantity(productId) {
    this.cartService.orderItems.map(x => {
      if (x._id === productId) {
        x.quantity++;
        this.cartService.updateTotalAmount();
      }
    });

  }

  decrementQuantity(productId) {
    this.cartService.orderItems.map(x => {
      if (x._id === productId) {
        if (x.quantity > 0) {
          x.quantity--;
          this.cartService.updateTotalAmount();
        }
      }
    });
  }

  displayQuantity(productId) {
    const index = this.cartService.orderItems.findIndex(x => x._id === productId);
    return this.cartService.orderItems[index].quantity;
  }
}
