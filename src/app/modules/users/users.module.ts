import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { paymentDetailsComponent } from './payment-details/payment-details.component';
import { GameStatsComponent } from './game-stats/game-stats.component';
import { SharedModule } from 'src/app/utility/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateUsersComponent } from './create-users/create-users.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: UsersListComponent },
  { path: 'player-details', component: PlayerDetailsComponent },
  { path: 'payment-details', component: paymentDetailsComponent},
  { path: 'game-stats', component: GameStatsComponent},
  { path: 'create-users', component: CreateUsersComponent}
];

@NgModule({
  declarations: [
    UsersListComponent,
    PlayerDetailsComponent,
    paymentDetailsComponent,
    GameStatsComponent,
    CreateUsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
