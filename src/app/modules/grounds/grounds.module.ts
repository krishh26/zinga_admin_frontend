import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroundListComponent } from './ground-list/ground-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/utility/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateGroundsComponent } from './create-grounds/create-grounds.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: 'ground-list', pathMatch: 'full' },
   { path: 'ground-list', component: GroundListComponent },
   { path: 'create-ground', component: CreateGroundsComponent },
];

@NgModule({
  declarations: [
    GroundListComponent,
    CreateGroundsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class GroundsModule { }
