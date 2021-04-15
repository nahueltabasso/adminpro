import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { validEqualsPasswords } from 'src/app/shared/common-validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;
  formularioSubmit: boolean = false;
  usuario: Usuario = new Usuario();

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      apellido: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      terminos: [false, Validators.required] 
    }, {
      validators: validEqualsPasswords
    });
  }

  public registrarUsuario() {
    this.formularioSubmit = true;
    if (!this.formulario.valid) return ;
    const { nombre, apellido, email, password } = this.formulario.value;
    this.usuario.nombre = nombre;
    this.usuario.apellido = apellido;
    this.usuario.email = email;
    this.usuario.password = password;
    this.usuarioService.registrarUsuario(this.usuario).subscribe(data => {
      // Navegamos al dashboard
      this.router.navigateByUrl('/');
    }, (err) => {
      Swal.fire('Error!', err.error.msg, 'error');
    });
  }

  public campoNoValido(campo: string): boolean {
    if (this.formulario.get(campo).invalid && this.formularioSubmit){
      return false;
    }
    return false;
  }

  public checkPassword(): boolean {
    return this.formulario.hasError('notEquals') &&
           this.formulario.get('password').dirty &&
           this.formulario.get('confirmPassword').dirty;
  }

}
