import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medico.models';
import { Usuario } from 'src/app/models/usuario.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: []
})
export class BusquedasComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private searchService: SearchService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ termino }) => {
      this.search(termino);
    });
  }

  public search(termino: string) {
    this.searchService.search(termino).subscribe((data: any) => {
      this.usuarios = data.usuarios;
      this.medicos = data.medicos;
      this.hospitales = data.hospitales;
    });
  }

}
