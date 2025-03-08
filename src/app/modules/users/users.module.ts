import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { paymentDetailsComponent } from './payment-details/payment-details.component';
import { GameStatsComponent } from './game-stats/game-stats.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: UsersListComponent },
  { path: 'player-details', component: PlayerDetailsComponent },
  { path: 'payment-details', component: paymentDetailsComponent},
  { path: 'game-stats', component: GameStatsComponent}
];

@NgModule({
  declarations: [
    UsersListComponent,
    PlayerDetailsComponent,
    paymentDetailsComponent,
    GameStatsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
