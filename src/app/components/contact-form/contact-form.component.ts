import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  constructor(
    private flashMessagesService: FlashMessagesService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private loaderService: NgxUiLoaderService
  ) {
    this.addresses = ['AZH', 'BCR', 'BRH', 'GOK', 'HJB', 'JCB', 'LBS', 'LLR', 'MBU', 'MMM', 'MS', 'MT',
                     'NH', 'NIV', 'PAT', 'RK', 'RLB', 'RP', 'SAM', 'SNIG', 'VS', 'TECM', 'VSRC', 'ZH'];
   }

  addresses: any;
  user: Order = {
    items: this.cartService.orderItems.filter(x => x.quantity > 0),
    customerName: '',
    phone: null,
    address: ''
  };

  paymentOption: string;

  ngOnInit() {
    this.paymentOption = 'Cash On Delivery';
  }

  onSubmit({value, valid}: {value: Order, valid: boolean}) {
    if (!valid) {
      // show flash-message
      this.flashMessagesService.show('Please fill details correctly!',
        {cssClass: 'alert-danger', timeout: 3000});
    } else {
      this.loaderService.start();
      this.orderService.submitOrder(this.user).subscribe(x => {
        this.orderService.confirmOrderId = x._id;

        // stop loader
        this.loaderService.stop();

        // show flash-message
        this.flashMessagesService.show('Please verify your phone number!',
        {cssClass: 'alert-success', timeout: 3000});

        // redirect to otp
        this.router.navigate(['/confirm-order']);
      },
      err => {
        this.loaderService.stop();
        this.flashMessagesService.show('Error Occurred!',
        {cssClass: 'alert-danger', timeout: 3000});
      });

      // this.flashMessagesService.show('Client added successfully!',
      //   {cssClass: 'alert-success', timeout: 3000});
      //   // redirect to otp
      // this.router.navigate(['/otp']);

    }
  }


}
