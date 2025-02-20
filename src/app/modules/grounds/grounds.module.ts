import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroundListComponent } from './ground-list/ground-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'ground-list', pathMatch: 'full' },
   { path: 'ground-list', component: GroundListComponent },
];

@NgModule({
  declarations: [
    GroundListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GroundsModule { }