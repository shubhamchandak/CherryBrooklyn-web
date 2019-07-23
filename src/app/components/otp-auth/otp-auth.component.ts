import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { OtpItem } from '../../models/otp-item';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-auth',
  templateUrl: './otp-auth.component.html',
  styleUrls: ['./otp-auth.component.css']
})
export class OtpAuthComponent implements OnInit {

  otpDisabled: boolean;
  orderConfirm: boolean;
  orderPending: boolean;
  phone: Number;
  orderStatus: Number = 1;
  totalAmount: any;
  deliveryCharges: any;
  discountAmount: any;
  orderItems: any = [];

  constructor(
    private orderService: OrderService,
    private flashMessagesService: FlashMessagesService,
    private loaderService: NgxUiLoaderService,
    private router: Router
  ) { }

  otpItem: OtpItem = {
    orderId: this.orderService.confirmOrderId,
    otpCode: ''
  };

  ngOnInit() {
    this.orderStatus = this.orderService.orderStatus;
    this.deliveryCharges = 0;
    this.loaderService.start();
    this.getOrderDetails(this.otpItem.orderId);
  }

  getOrderDetails(id) {
    this.orderService.getOrderDetails(id).subscribe(
      data => {
          this.discountAmount = data.order.discount;
          this.totalAmount = data.order.netAmount;
          this.orderItems = data.order.items;
          this.phone = data.order.phone;
          this.deliveryCharges = data.order.deliveryCharges;
          this.loaderService.stop();
      },
      error => {
        this.flashMessagesService.show('Error occurred! Please try again',
        {cssClass: 'alert-danger', timeout: 3000});
        this.loaderService.stop();
      }
    );
  }

  onSubmit({value, valid}: {value: any, valid: boolean}) {
    if (!valid) {
      this.flashMessagesService.show('Please fill the correct OTP',
        {cssClass: 'alert-danger', timeout: 3000});
    } else {
      this.loaderService.start();
      this.orderService.updateOrderStatus(this.otpItem).subscribe(
        data => {
          this.orderService.orderStatus = 2;
          this.orderStatus = this.orderService.orderStatus;
          this.loaderService.stop();
          // show flash-message
          this.flashMessagesService.show('Order Confirmed!',
          {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/order-summary', this.otpItem.orderId]);

        },
        error => {
          this.loaderService.stop();
          this.flashMessagesService.show('OTP not valid!',
        {cssClass: 'alert-danger', timeout: 3000});
        }
      );
    }
  }

}
