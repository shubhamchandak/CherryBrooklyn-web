import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { OtpItem } from '../../models/otp-item';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-otp-auth',
  templateUrl: './otp-auth.component.html',
  styleUrls: ['./otp-auth.component.css']
})
export class OtpAuthComponent implements OnInit {

  otpDisabled: boolean;
  orderConfirm: boolean;
  orderPending: boolean;

  constructor(
    private orderService: OrderService,
    private flashMessagesService: FlashMessagesService
  ) { }

  otpItem: OtpItem = {
    orderId: this.orderService.confirmOrderId,
    otpCode: ''
  };

  ngOnInit() {
    this.otpDisabled = false;
    this.orderPending = true;
  }

  onSubmit({value, valid}: {value: any, valid: boolean}) {
    if (!valid) {
      this.flashMessagesService.show('Please fill the correct OTP',
        {cssClass: 'alert-danger', timeout: 3000});
    } else {
      this.orderService.updateOrderStatus(this.otpItem).subscribe(
        data => {
          this.otpDisabled = true;
          this.orderConfirm = true;
          this.orderPending = false;
          console.log(data);

        },
        error => {
          this.flashMessagesService.show('OTP not valid!',
        {cssClass: 'alert-danger', timeout: 3000});
        }
      );
    }
  }

}
