import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  constructor(
    private flashMessagesService: FlashMessagesService
  ) { }

    user: User = {
    name: '',
    email: '',
    phone: null,
    amount: 0,
    address: ''
  };

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: User, valid: boolean}) {
    if (!valid) {
      // show flash-message
      this.flashMessagesService.show('Please fill out the form correctly!',
        {cssClass: 'alert-danger', timeout: 3000});
    } else {
      // add client
      // this.clientService.addClient(value);
      // show flash-message
      this.flashMessagesService.show('Client added successfully!',
      {cssClass: 'alert-success', timeout: 3000});
      // redirect to dashboard
      // this.router.navigate(['/']);
    }
  }


}
