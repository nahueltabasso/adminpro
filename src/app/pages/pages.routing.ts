import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaOneComponent } from './grafica-one/grafica-one.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dasboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'grafica1', component: GraficaOneComponent, data: { titulo: 'Grafica Nro 1' } },      
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajuste de Cuenta' } },     
            { path: 'promesas', component: PromesaComponent, data: { titulo: 'Promesa' } },               
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RXJS' }  },               
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
