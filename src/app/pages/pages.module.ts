import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaOneComponent } from './grafica-one/grafica-one.component';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraficaOneComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraficaOneComponent,
    PagesComponent
  ]
})
export class PagesModule { }
