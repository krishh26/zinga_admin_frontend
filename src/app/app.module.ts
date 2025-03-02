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
import { SideNavComponent } from './common/side-nav/side-nav.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './utility/shared/shared.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIInterceptor } from './utility/interceptor/ApiInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HeaderComponent,
    FooterComponent
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
    TournamentsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }),
    SharedModule
  ],
  providers: [ { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
