import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroundListComponent } from './ground-list/ground-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/utility/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  { path: '', redirectTo: 'ground-list', pathMatch: 'full' },
   { path: 'ground-list', component: GroundListComponent },
];

@NgModule({
  declarations: [
    GroundListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxPaginationModule
  ]
})
export class GroundsModule { }
