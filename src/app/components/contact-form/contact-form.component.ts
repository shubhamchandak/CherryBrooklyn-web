import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

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
      this.orderService.submitOrder(this.user).subscribe(x => {
        // console.log(x);

        this.orderService.confirmOrderId = x._id;

        // show flash-message
        this.flashMessagesService.show('Please verify your phone number!',
        {cssClass: 'alert-success', timeout: 3000});
        // redirect to otp
        this.router.navigate(['/confirm-order']);
      },
      err => {
        console.log(err);
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
