import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from './support/support.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'support', pathMatch: 'full' },
  { path: 'support', component: SupportComponent },
];


@NgModule({
  declarations: [
    SupportComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SupportModule { }
