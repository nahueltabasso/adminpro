import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  endpoint = environment.based_endpoint + '/todo';
  

  constructor(private http: HttpClient) {}

  search(termino: string): Observable<any> {
    return this.http.get<any>(this.endpoint + '/' + termino, { headers: { 'Authorization': localStorage.getItem('auth_token') } });
  }


}
