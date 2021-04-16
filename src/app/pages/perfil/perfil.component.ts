import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { FileService } from 'src/app/services/file.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  formulario: FormGroup;
  usuario: Usuario = new Usuario();
  imagenSeleccionada: File;
  urlImagenTemp: any;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private usuarioService: UsuarioService,
              private fileService: FileService) {}

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
    this.createForm();
    this.formulario.controls['nombre'].setValue(this.usuario.nombre);
    this.formulario.controls['apellido'].setValue(this.usuario.apellido);
    this.formulario.controls['email'].setValue(this.usuario.email);
    if (this.usuario.google) {
      this.formulario.controls['email'].disable();
    }
  }

  public createForm() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.compose([Validators.required])],
      apellido: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  public actualizarPerfil() {
    if (this.formulario.invalid) return;

    const { nombre, apellido, email } = this.formulario.value;
    this.usuario.nombre = nombre;
    this.usuario.apellido = apellido;
    this.usuario.email = email;
  
    this.usuarioService.updatePerfil(this.usuario).subscribe((data: any) => {
      this.usuario = data.usuario;
      this.authService.usuario = this.usuario;
      Swal.fire('Actualizado!', 'Usuario Actualizado con Exito!', 'success');
    }, (err) => {
      Swal.fire('Error!', `${err.error.msg}`, 'error');
    });
  }

  public seleccionarImagen(file: File) {
    this.imagenSeleccionada = file;
    // Si el archivo no existe nos salimos de la funcion
    if (!file) return;
    
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.urlImagenTemp = reader.result;
    }
  }

  public subirImagen() {
    this.fileService.actualizarFoto(this.imagenSeleccionada, 'usuarios', this.usuario.uid).then(data => {
      this.authService.usuario.img = data
      Swal.fire('Guardado!', 'Imagen actualizada!', 'success');
    });
  }
}
