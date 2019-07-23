import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  totalAmount: number;
  deliveryCharges: number;
  discountAmount: number;
  finalAmount: number;
  customerName: string;
  orderStatus: any;
  orderItems: any = [];

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private loaderService: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.loaderService.start();
    this.deliveryCharges = 0;
    const id = this.route.snapshot.paramMap.get('id');
    this.getOrderDetails(id);
  }

  getOrderDetails(id: any) {
    this.orderService.getOrderDetails(id).subscribe(
      data => {
        this.loaderService.stop();
        this.orderStatus = data.order.status;
        this.totalAmount = data.order.netAmount;
        this.discountAmount = data.order.discount;
        this.finalAmount = data.order.finalAmount;
        this.customerName = data.order.customerName;
        this.orderItems = data.order.items;
        this.deliveryCharges = data.order.deliveryCharges ? data.order.deliveryCharges : 0;
      },
      error => {
        this.loaderService.stop();
        this.orderStatus = 0;
      }
    );
  }

}
