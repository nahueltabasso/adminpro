import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaOneComponent } from './grafica-one/grafica-one.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenedores/usuarios/usuarios.component';
import { MedicosComponent } from './mantenedores/medicos/medicos.component';
import { HospitalesComponent } from './mantenedores/hospitales/hospitales.component';
import { MedicoAddComponent } from './mantenedores/medicos/medico-add/medico-add.component';
import { MedicoEditComponent } from './mantenedores/medicos/medico-edit/medico-edit.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dasboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'grafica1', component: GraficaOneComponent, data: { titulo: 'Grafica Nro 1' } },      
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajuste de Cuenta' } },     
            { path: 'promesas', component: PromesaComponent, data: { titulo: 'Promesa' } },               
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RXJS' }  },        
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de Usuario' }  },    
            { path: 'search/:termino', component: BusquedasComponent, data: { titulo: 'Busquedas' }  },    
            
            // Mantenedores
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios de Aplicacion' }, canActivate: [ AdminGuard ]  },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales de Aplicacion' }  },                      
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos de Aplicacion' }  },
            { path: 'medicos/form', component: MedicoAddComponent, data: { titulo: 'Medicos de Aplicacion' }  },
            { path: 'medicos/form/:id', component: MedicoEditComponent, data: { titulo: 'Medicos de Aplicacion' }  },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
