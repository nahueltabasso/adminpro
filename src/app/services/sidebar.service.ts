import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  // menu: any[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Main', url: '/' },
  //       { titulo: 'Progress Bar', url: 'progress' },
  //       { titulo: 'Graficas', url: 'grafica1' },
  //       { titulo: 'Promesas', url: 'promesas' },
  //       { titulo: 'RXJS', url: 'rxjs'}
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenedores',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios' },
  //       { titulo: 'Hospitales', url: 'hospitales' },
  //       { titulo: 'Medicos', url: 'medicos' },
  //     ]
  //   }
  // ];

  menu: any[] = [];

  constructor() {}

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }

}
