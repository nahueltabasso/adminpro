import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  endpoint = environment.based_endpoint + '/usuario';
  endpointCollectionUsuario = environment.based_endpoint + '/todo/collecion/usuarios';

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.endpoint, usuario);
  }

  updatePerfil(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.endpoint + '/' + usuario.uid, usuario, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  getAll(desde: number = 0): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.endpoint + '?desde=' + desde, { headers: { 'Authorization' : localStorage.getItem('auth_token') } });
  }

  searchUsuarios(termino: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.endpointCollectionUsuario + '/' + termino, { headers: { 'Authorization' : localStorage.getItem('auth_token') } });
  }

  deleteUsuario(id: string): Observable<void> {
    return this.http.delete<void>(this.endpoint + '/' + id, { headers: { 'Authorization' : localStorage.getItem('auth_token') } });
  }

}
