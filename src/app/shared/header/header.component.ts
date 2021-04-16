import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  imgUrl: string = '';
  usuario: Usuario = new Usuario();
  url: string = environment.based_endpoint;

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.usuario = this.authService.usuario
    this.imgUrl = this.getUrlImagen();
  }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login')
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
