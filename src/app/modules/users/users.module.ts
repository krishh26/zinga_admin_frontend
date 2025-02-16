import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PlayerDetailsComponent } from './player-details/player-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: UsersListComponent },
  { path: 'player-details', component: PlayerDetailsComponent }
];

@NgModule({
  declarations: [
    UsersListComponent,
    PlayerDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
