import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateTournamentsComponent } from './create-tournaments/create-tournaments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  { path: 'tournament', component: TournamentsComponent },
  { path: 'create-tournament', component: CreateTournamentsComponent }
];

@NgModule({
  declarations: [
    TournamentsComponent,
    CreateTournamentsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    TournamentsComponent,
    CreateTournamentsComponent,
  ]
})
export class TournamentsModule { }
