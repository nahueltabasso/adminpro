import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequestDTO } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  loginDto: LoginRequestDTO = new LoginRequestDTO();
  auth2: any;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.createForm();
    this.renderButton();
  }

  public createForm() {
    this.formulario = this.fb.group({
      email: [localStorage.getItem('email') || '', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  public login() {
    if (!this.formulario.valid) return;

    const { email, password } = this.formulario.value;
    this.loginDto.email = email;
    this.loginDto.password = password;
    this.authService.login(this.loginDto).subscribe(data => {
      if (this.formulario.get('remember').value) {
        localStorage.setItem('email', this.loginDto.email);
      } else {
        localStorage.removeItem('email');
      }
      this.router.navigateByUrl('/');
    }, (err) => {
      Swal.fire('Error!', err.error.msg, 'error');
    });
  }

  public renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }

  public startApp() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '924448187777-dl1p6tssa819jh5015n30kg9u3kcmpaa.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.authService.loginGoogle(id_token).subscribe(data => {
            this.router.navigateByUrl('/');
          });
        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }


}
