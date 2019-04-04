import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ProductsComponent } from './components/products/products.component';
import { OtpAuthComponent } from './components/otp-auth/otp-auth.component';
import { HomeComponent } from './components/home/home.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'order-details', component: ContactFormComponent},
  {path: 'order', component: ProductsComponent},
  {path: 'confirm-order', component: OtpAuthComponent},
  {path: 'order-summary/:id', component: OrderSummaryComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
