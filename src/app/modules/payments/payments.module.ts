import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'payment-list', pathMatch: 'full' },
   { path: 'payment-list', component: PaymentListComponent },
];

@NgModule({
  declarations: [
    PaymentListComponent
  ],
  imports: [
    CommonModule,
       RouterModule.forChild(routes)
  ]
})
export class PaymentsModule { }
