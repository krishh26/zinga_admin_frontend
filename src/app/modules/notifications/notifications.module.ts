import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'notifications', pathMatch: 'full' },
   { path: 'notification-list', component: NotificationListComponent },
];

@NgModule({
  declarations: [
    NotificationListComponent,
  ],
  imports: [
    CommonModule,
     RouterModule.forChild(routes)
  ]
})
export class NotificationsModule { }
