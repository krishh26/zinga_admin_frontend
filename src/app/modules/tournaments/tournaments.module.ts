import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'tournaments', component: TournamentsComponent }
];

@NgModule({
  declarations: [
    TournamentsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ]
})
export class TournamentsModule { }
