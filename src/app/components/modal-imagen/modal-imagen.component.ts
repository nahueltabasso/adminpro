import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: []
})
export class ModalImagenComponent implements OnInit {

  imagenSeleccionada: File;
  urlImagenTemp: any;

  constructor(public modalSevice: ModalImagenService,
              public fileService: FileService) {}

  ngOnInit(): void {
  }

  public cerrarModal() {
    this.urlImagenTemp = null;
    this.modalSevice.cerrarModal();
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
    const id = this.modalSevice.id;
    const tipo = this.modalSevice.tipo;
    this.fileService.actualizarFoto(this.imagenSeleccionada, tipo, id).then(data => {
      // this.authService.usuario.img = data
      Swal.fire('Guardado!', 'Imagen actualizada!', 'success');
      this.modalSevice.nuevaImagen.emit(data);
      this.cerrarModal();
    });
  }

}
