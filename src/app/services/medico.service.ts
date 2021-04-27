import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.models';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  endpoint = environment.based_endpoint + '/medico';
  endpointCollectionMedico = environment.based_endpoint + '/todo/collecion/medicos';

  constructor(private http: HttpClient) {}

  getAll(desde: number): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.endpoint +  '?desde=' + desde, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  deleteMedico(id: string): Observable<void> {
    return this.http.delete<void>(this.endpoint + '/' + id, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  searchMedicos(termino: string): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.endpointCollectionMedico + '/' + termino, { headers: { 'Authorization' : localStorage.getItem('auth_token') } });
  }

  registrarMedico(medico: {nombre: string, apellido: string, hospital: string}): Observable<Medico> {
    return this.http.post<Medico>(this.endpoint, medico, { headers: { 'Authorization' : localStorage.getItem('auth_token') } });
  }

  actualizarMedico(id: string, medico: {nombre: string, apellido: string, hospital: string}): Observable<Medico> {
    return this.http.put<Medico>(this.endpoint + '/' + id, medico, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  getMedico(id: string): Observable<Medico> {
    return this.http.get<Medico>(this.endpoint + '/' + id, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }
}
