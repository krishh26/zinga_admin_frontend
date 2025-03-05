import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityHomeComponent } from './community-home/community-home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/utility/shared/shared.module';

const routes: Routes = [
  { path: '', redirectTo: 'community-home', pathMatch: 'full' },
  { path: 'community-home', component: CommunityHomeComponent },
];


@NgModule({
  declarations: [
    CommunityHomeComponent
  ],
  imports: [
    CommonModule,
       RouterModule.forChild(routes),
       SharedModule,
       NgxPaginationModule
  ]
})
export class CommunityModule { }
