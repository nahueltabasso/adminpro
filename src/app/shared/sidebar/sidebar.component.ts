import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  menuItems: any[] = [];
  imgUrl: string = '';
  usuario: Usuario = new Usuario();
  url: string = environment.based_endpoint;

  constructor(private sidebarService: SidebarService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.menuItems = this.sidebarService.menu;
    this.usuario = this.authService.usuario
    this.imgUrl = this.getUrlImagen();
  }

  private getUrlImagen() {
    if (this.usuario.img.includes('https')) {
      return this.usuario.img;
    }

    if (!this.usuario.img) {
        return `${this.url}/uploads/usuarios/no-image`;
    } 
    return `${this.url}/uploads/usuarios/${this.usuario.img}`;
  }

}
