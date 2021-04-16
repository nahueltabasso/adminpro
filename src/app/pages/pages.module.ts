import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaOneComponent } from './grafica-one/grafica-one.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraficaOneComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromesaComponent,
    RxjsComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraficaOneComponent,
    PagesComponent,
    AccountSettingsComponent
  ]
})
export class PagesModule { }
