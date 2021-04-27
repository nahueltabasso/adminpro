import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.models';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  endpoint = environment.based_endpoint + '/hospital';
  endpointCollectionHospital = environment.based_endpoint + '/todo/collecion/hospitales';

  constructor(private http: HttpClient) {}

  getAll(desde: number): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(this.endpoint +  '?desde=' + desde, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  crearHospital(hospital: Hospital): Observable<Hospital> {
    return this.http.post<Hospital>(this.endpoint, hospital, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  deleteHospital(id: string): Observable<void> {
    return this.http.delete<void>(this.endpoint + '/' + id, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  actualizarHospital(id: string, hospital: Hospital): Observable<Hospital> {
    return this.http.put<Hospital>(this.endpoint + '/' + id, hospital, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }

  searchHospitales(termino: string): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(this.endpointCollectionHospital + '/' + termino, { headers: { 'Authorization' : localStorage.getItem('auth_token') } });
  }

  getHospitales(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(this.endpoint + '/hospitales-combo', { headers: { 'Authorization' : localStorage.getItem('auth_token') } });
  }

}
