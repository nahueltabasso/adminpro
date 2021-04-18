import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit, OnDestroy {

  url: string = environment.based_endpoint;
  usuariosList: Usuario[] = [];
  totalUsuarios: number = 0;
  paginaActual: number = 0;
  loading: boolean = false;
  imagenesSubs: Subscription;

  constructor(private usuarioService: UsuarioService,
              private authService: AuthService,
              private modalImagenService: ModalImagenService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imagenesSubs = this.modalImagenService.nuevaImagen.subscribe(img => this.cargarUsuarios());
  }

  ngOnDestroy(): void {
    this.imagenesSubs.unsubscribe();    
  }

  public cambiarPagina(valor: number) {
    this.paginaActual += valor;
    if (this.paginaActual < 0) {
      this.paginaActual = 0;
    } else if (this.paginaActual > this.totalUsuarios) {
      this.paginaActual -= valor;
    }
    this.cargarUsuarios();
  }

  public cargarUsuarios() {
    this.loading = true;
    this.usuarioService.getAll(this.paginaActual).subscribe((data: any) => {
      this.usuariosList = data.usuarios;
      this.totalUsuarios = data.totalRegistros;
      this.loading = false;
    });
  }

  public getUrlImagen(usuario: Usuario) {
    usuario.img = usuario.img !== null && usuario.img !== undefined ? usuario.img : '';
    if (usuario.img.includes('https')) {
      return usuario.img;
    }

    if (!usuario.img) {
        return `${this.url}/uploads/usuarios/no-image`;
    } 
    return `${this.url}/uploads/usuarios/${usuario.img}`;
  }

  public search(termino: string) {
    if (termino.length === 0) {
      return this.cargarUsuarios();
    }
    this.loading = true;
    this.usuarioService.searchUsuarios(termino).subscribe((data: any) => {
      this.usuariosList = data.resultados;
      this.loading = false;
    });
  }

  public eliminar(id: string) {
    if (id === this.authService.usuario.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo!', 'error');
    }

    Swal.fire({
      title: 'Estas seguro?',
      text: `Seguro que desea eliminar al Usuario`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.deleteUsuario(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire('Eliminado', 'Usuario eliminado con exito!', 'success');
        });
      }
    });
  }

  public cambiarRol(usuario: Usuario) {
    this.usuarioService.updatePerfil(usuario).subscribe(data => {
      Swal.fire('Actualizado', 'Rol actualizado con exito!', 'success');
    })
  }

  public abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, '');
  }

}
