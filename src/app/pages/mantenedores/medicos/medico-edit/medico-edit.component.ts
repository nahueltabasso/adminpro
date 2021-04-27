import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medico.models';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico-edit',
  templateUrl: './medico-edit.component.html',
  styles: []
})
export class MedicoEditComponent implements OnInit {

  formulario: FormGroup;
  medico: Medico = new Medico();
  comboHospital: Hospital[] = [];
  medicoSeleccionado: Medico;
  hospitalSeleccionado: Hospital;

  constructor(private medicoService: MedicoService,
              private hospitalService: HospitalService,
              private modalImagenService: ModalImagenService,
              private fb: FormBuilder,
              private router: Router,
              private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.createForm();
    
    let idMedico;
    this.activateRoute.params.subscribe(({ id }) => {
      idMedico = id;
    });

    this.medicoService.getMedico(idMedico).subscribe((data: any) => {
      this.medico = data.medico;
      this.formulario.controls['nombre'].setValue(this.medico.nombre);
      this.formulario.controls['apellido'].setValue(this.medico.apellido);
      this.formulario.controls['hospital'].setValue(this.medico.hospital._id);
      this.hospitalSeleccionado = this.medico.hospital;
      this.medicoSeleccionado = this.medico;
    });
    this.hospitalService.getHospitales().subscribe((data: any) => {
      this.comboHospital = data.hospitales;
    });
  }

  public createForm() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      hospital: ['', Validators.required]
    });
    this.formulario.get('hospital').valueChanges.subscribe(hospitalId => {
      this.hospitalSeleccionado = this.comboHospital.find(h => h._id === hospitalId);
    });
  }

  public save() {
    if (this.formulario.invalid) return;

    const data = {
      ...this.formulario.value,
    };
    this.medicoService.actualizarMedico(this.medico._id, this.formulario.value).subscribe((data: any) => {
      this.medico = data.medico;
      this.medicoSeleccionado = data.medico;
      Swal.fire('Actualizado!', 'Medico actualizado con exito!', 'success');
      this.router.navigateByUrl('/dashboard/medicos');
    });
  }

  public abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, '');
  }


}
