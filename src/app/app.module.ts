import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersModule } from './modules/users/users.module';
import { ClubsModule } from './modules/clubs/clubs.module';
import { CommunityModule } from './modules/community/community.module';
import { GroundsModule } from './modules/grounds/grounds.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { SupportModule } from './modules/support/support.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsersModule,
    ClubsModule,
    CommunityModule,
    GroundsModule,
    NotificationsModule,
    PaymentsModule,
    StatisticsModule,
    SupportModule,
    TournamentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
