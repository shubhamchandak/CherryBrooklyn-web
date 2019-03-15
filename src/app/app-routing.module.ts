import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ProductsComponent } from './components/products/products.component';
import { OtpAuthComponent } from './components/otp-auth/otp-auth.component';

const routes: Routes = [
  {path: 'contact', component: ContactFormComponent},
  {path: '', component: ProductsComponent},
  {path: 'confirm-order', component: OtpAuthComponent}
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
