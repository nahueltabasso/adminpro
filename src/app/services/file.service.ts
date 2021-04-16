import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.based_endpoint;

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() {}

  async actualizarFoto(file: File, tipo: 'usuarios'|'medicos'|'hospitales', id: string) {
    try {
      const url = `${base_url}/uploads/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', file);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': localStorage.getItem('auth_token') || ''
        },
        body: formData
      });

      const data = await resp.json();
      if (data.ok) {
        return data.nombreArchivo;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
