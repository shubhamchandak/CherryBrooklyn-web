import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { ProductService } from '../app/services/product.service';
import { ProductsComponent } from './components/products/products.component';
import { ButtonModule } from 'primeng/button';
import { CartComponent } from './components/cart/cart.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { OtpAuthComponent } from './components/otp-auth/otp-auth.component';
import { HomeComponent } from './components/home/home.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ItemComponent } from './components/item/item.component';
import { ItemContainerComponent } from './components/item-container/item-container.component';
import { ButtonComponent } from './components/button/button.component';
import { SidebarComponent } from './components/item-container/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CartComponent,
    HeaderComponent,
    ContactFormComponent,
    InvoiceComponent,
    OtpAuthComponent,
    HomeComponent,
    OrderSummaryComponent,
    ItemComponent,
    ItemContainerComponent,
    ButtonComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ButtonModule,
    FlashMessagesModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    NgxUiLoaderModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
