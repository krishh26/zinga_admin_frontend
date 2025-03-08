import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CommunityListComponent } from './community-list/community-list.component'

const routes: Routes = [
  { path: '', redirectTo: 'community-list', pathMatch: 'full' },
  { path: 'community-list', component: CommunityListComponent },
];


@NgModule({
  declarations: [
    CommunityListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CommunityModule { }
