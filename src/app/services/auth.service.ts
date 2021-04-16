import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequestDTO, Usuario } from '../models/usuario.model';
import { catchError, map, tap } from 'rxjs/operators';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  auth2: any;
  usuario: Usuario = new Usuario();
  endpoint = environment.based_endpoint;

  constructor(private http: HttpClient) {
    this.googleInit();
  }

  login(login: LoginRequestDTO): Observable<string> {
    return this.http.post<string>(this.endpoint + '/login', login)
               .pipe(
                 tap((rta: any) => {
                    localStorage.setItem('auth_token', rta.token);
                 })
               );
  }

  loginGoogle(token: string): Observable<string> {
    return this.http.post<string>(this.endpoint + '/login/google', { token })
               .pipe(
                 tap((rta: any) => {
                    localStorage.setItem('auth_token', rta.token);
                 })
               );
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('auth_token') || '';
    return this.http.get(this.endpoint + '/login/refresh-token', { headers : { 'Authorization' : token }}).pipe(
      map((data: any) => {
        localStorage.setItem('auth_token', data.token);
        this.usuario = data.usuario;
        localStorage.setItem('auth_user', data.usuario);
        return true;
      }),
      catchError(err => of(false))
    );
  }

  googleInit() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '924448187777-dl1p6tssa819jh5015n30kg9u3kcmpaa.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
    });
  }
}
