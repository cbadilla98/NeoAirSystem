import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoAvionesService } from 'src/app/services/admin-tipoAviones/tipoAviones.service';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tipo-avion-form',
  templateUrl: './tipo-avion-form.component.html',
  styleUrls: ['./tipo-avion-form.component.scss']
})
export class TipoAvionFormComponent implements OnInit {
  postForm = new FormGroup({

    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    annio: new FormControl('', Validators.required),
    cantPasajeros: new FormControl('', Validators.required),
    cantFilas: new FormControl('', Validators.required),
    cantAsientosPorFila: new FormControl('', Validators.required),
  });
  
  constructor(
    private tipoAvionesService: TipoAvionesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  editMode = false;
  post: any = {};

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
///para hacer el de actualizar/modificar
        this.tipoAvionesService.getById(params['id']).subscribe((data) => {
          this.post = data;
          this.postForm.setValue({
            nombre: data.nombre,
            correo: data.correo,
            usuario: data.usuario,
            contrasennia: data.contrasennia,
            apellidos: data.apellidos,
            fechaNacimiento: data.fechaNacimiento,
            telefonoCelular: data.telefonoCelular,
            tipoUsuario: data.tipoUsuario,

          });
        });
      }
    });
    
    
  }
 

  navigateToList() {
    this.router.navigate(['/dashboard/blog/list']);
  }

  submitForm() {
    console.log("paso por aca 1");
    if (this.postForm.valid) {
      console.log("paso por aca2 ");
      if (this.editMode) {
        console.log("paso por aca 3");
        this.tipoAvionesService
          .edit(this.post._id, this.postForm.value)
          .subscribe((data) => {
            this.navigateToList();
          });
      } else {
        console.log("paso por aca 4");
        this.tipoAvionesService.create(this.postForm.value).subscribe((data) => {
          this.navigateToList();
        });
      }
    }
  }
}

