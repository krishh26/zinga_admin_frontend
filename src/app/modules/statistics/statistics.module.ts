import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticComponent } from './statistic/statistic.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'statistic', pathMatch: 'full' },
   { path: 'statistic', component: StatisticComponent },
];


@NgModule({
  declarations: [
    StatisticComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)
  ]
})
export class StatisticsModule { }
