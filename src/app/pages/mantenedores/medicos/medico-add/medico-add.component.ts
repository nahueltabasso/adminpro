import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medico.models';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico-add',
  templateUrl: './medico-add.component.html',
  styles: []
})
export class MedicoAddComponent implements OnInit {

  formulario: FormGroup;
  medico: Medico = new Medico();
  comboHospital: Hospital[] = [];
  medicoSeleccionado: Medico;
  hospitalSeleccionado: Hospital;

  constructor(private medicoService: MedicoService,
              private hospitalService: HospitalService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
    this.createForm();
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

    const { nombre, apellido } = this.formulario.value;
    this.medico.nombre = nombre;
    this.medico.apellido = nombre;
    this.medicoService.registrarMedico(this.formulario.value).subscribe(data => {
      Swal.fire('Registrado!', 'Medico registrado con exito!', 'success');
      this.router.navigateByUrl('/dashboard/medicos');
    });
  }

}
