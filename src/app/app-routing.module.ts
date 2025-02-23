import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'user', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) },
  { path: 'clubs', loadChildren: () => import('./modules/clubs/clubs.module').then(m => m.ClubsModule) },
  { path: 'grounds', loadChildren: () => import('./modules/grounds/grounds.module').then(m => m.GroundsModule) },
  { path: 'notifications', loadChildren: () => import('./modules/notifications/notifications.module').then(m => m.NotificationsModule) },
  { path: 'payments', loadChildren: () => import('./modules/payments/payments.module').then(m => m.PaymentsModule) },
  { path: 'statistics', loadChildren: () => import('./modules/statistics/statistics.module').then(m => m.StatisticsModule) },
  { path: 'tournaments', loadChildren: () => import('./modules/tournaments/tournaments.module').then(m => m.TournamentsModule) },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
