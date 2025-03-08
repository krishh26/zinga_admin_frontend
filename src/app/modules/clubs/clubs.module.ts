import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubComponent } from './club/club.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'clubs', pathMatch: 'full' },
  { path: 'club', component: ClubComponent },
];

@NgModule({
  declarations: [
  ClubComponent
],
  imports: [
    CommonModule,
      RouterModule.forChild(routes)
  ]
})
export class ClubsModule { }
