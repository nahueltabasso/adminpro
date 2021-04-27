import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.models';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitalList: Hospital[] = [];
  totalHospitales: number = 0;
  paginaActual: number = 0;
  loading: boolean = false;
  imgSubs: Subscription;

  constructor(private hospitalService: HospitalService,
              private modalImagenService: ModalImagenService) {}

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe(img => this.cargarHospitales());
  }

  public cargarHospitales() {
    this.loading = true;
    this.hospitalService.getAll(this.paginaActual).subscribe((data: any) => {
      this.hospitalList = data.hospitales;
      this.totalHospitales = data.totalRegistros;
      this.loading = false;
    });
  }

  public cambiarPagina(valor: number) {
    this.paginaActual += valor;
    if (this.paginaActual < 0) {
      this.paginaActual = 0;
    } else if (this.paginaActual > this.totalHospitales) {
      this.paginaActual -= valor;
    }
    this.cargarHospitales();
  }

  public async abrirModalSweetAlert() {
    const valor = await Swal.fire<string>({
      title: 'Formulario Alta Hospital',
      text: 'Ingrese el nombre del nuevo Hospital',
      input: 'text',
      inputPlaceholder: 'Ingresa el nombre del Hospital',
      showCancelButton: true
    });

    const value = valor.value;
    if (value.trim().length > 0) {
      let hospital = new Hospital();
      hospital.nombre = value;
      this.hospitalService.crearHospital(hospital).subscribe((data: any) => {
        Swal.fire('Registrado!', 'Hospital registrado con exito!', 'success');
        this.hospitalList.push(data.hospital);
      });
    }
  }

  public update(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital).subscribe(data => {
      Swal.fire('Actualizado!', 'Hospital actualizado con exito', 'success');
      this.cargarHospitales();
    });
  }

  public eliminar(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Seguro que desea eliminar el Hospital`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.hospitalService.deleteHospital(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire('Eliminado', 'Hospital eliminado con exito!', 'success');
        });
      }
    });
  }

  public search(termino: string) {
    if (termino.length === 0) {
      return this.cargarHospitales();
    }
    this.loading = true;
    this.hospitalService.searchHospitales(termino).subscribe((data: any) => {
      this.hospitalList = data.resultados;
      this.loading = false;
    });
  }

  public abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, '');
  }
}
