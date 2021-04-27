import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.models';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicosList: Medico[] = [];
  totalMedicos: number = 0;
  paginaActual: number = 0;
  loading: boolean = false;
  imgSubs: Subscription;

  constructor(private medicoService: MedicoService,
              private modalImagenService: ModalImagenService) {}

  ngOnInit(): void {
    this.cargarMedicos();
  }

  public cargarMedicos() {
    this.loading = true;
    this.medicoService.getAll(this.paginaActual).subscribe((data: any) => {
      this.medicosList = data.medicos;
      this.totalMedicos = data.totalRegistros;
      this.loading = false;
      console.log(this.medicosList)
    });
  }

  public cambiarPagina(valor: number) {
    this.paginaActual += valor;
    if (this.paginaActual < 0) {
      this.paginaActual = 0;
    } else if (this.paginaActual > this.totalMedicos) {
      this.paginaActual -= valor;
    }
    this.cargarMedicos();
  }

  public eliminar(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Seguro que desea eliminar el Medico`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.medicoService.deleteMedico(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire('Eliminado', 'Medico eliminado con exito!', 'success');
        });
      }
    });
  }

  public search(termino: string) {
    if (termino.length === 0) {
      return this.cargarMedicos();
    }
    this.loading = true;
    this.medicoService.searchMedicos(termino).subscribe((data: any) => {
      this.medicosList = data.resultados;
      this.loading = false;
    });
  }

  public abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, '');
  }

}
