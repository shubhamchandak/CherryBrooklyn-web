import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { OtpItem } from '../../models/otp-item';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-otp-auth',
  templateUrl: './otp-auth.component.html',
  styleUrls: ['./otp-auth.component.css']
})
export class OtpAuthComponent implements OnInit {

  otpDisabled: boolean;
  orderConfirm: boolean;
  orderPending: boolean;
  phone: number;

  constructor(
    private orderService: OrderService,
    private flashMessagesService: FlashMessagesService,
    private loaderService: NgxUiLoaderService
  ) { }

  otpItem: OtpItem = {
    orderId: this.orderService.confirmOrderId,
    otpCode: ''
  };

  ngOnInit() {
    this.otpDisabled = false;
    this.orderPending = true;
    this.phone = this.orderService.currentOrder.phone;
  }

  onSubmit({value, valid}: {value: any, valid: boolean}) {
    if (!valid) {
      this.flashMessagesService.show('Please fill the correct OTP',
        {cssClass: 'alert-danger', timeout: 3000});
    } else {
      this.loaderService.start();
      this.orderService.updateOrderStatus(this.otpItem).subscribe(
        data => {
          this.otpDisabled = true;
          this.orderConfirm = true;
          this.orderPending = false;
          this.loaderService.stop();
          // show flash-message
        this.flashMessagesService.show('Order Confirmed!',
        {cssClass: 'alert-success', timeout: 3000});

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
