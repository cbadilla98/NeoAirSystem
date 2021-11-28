import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoAvionesService } from 'src/app/services/admin-tipoAviones/tipoAviones.service';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-avion-form',
  templateUrl: './tipo-avion-form.component.html',
  styleUrls: ['./tipo-avion-form.component.scss']
})


export class TipoAvionFormComponent implements OnInit {
  anio = Date.prototype.getFullYear.toString();
  postForm = new FormGroup({

    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    annio: new FormControl('', Validators.required),
    cantPasajeros: new FormControl('', Validators.required),
    cantFilas: new FormControl('', Validators.required),
    cantAsientosPorFila: new FormControl('', Validators.required),
  });

  get marca() {
    return this.postForm.get('marca');
  }
  get modelo() {
    return this.postForm.get('modelo');
  }
  get annio() {
    return this.postForm.get('annio');
  }
  get cantPasajeros() {
    return this.postForm.get('cantPasajeros');
  }
  get cantFilas() {
    return this.postForm.get('cantFilas');
  }
  get cantAsientosPorFila() {
    return this.postForm.get('cantAsientosPorFila');
  }

  constructor(
    private tipoAvionesService: TipoAvionesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  editMode = false;
  post: any = {};

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.tipoAvionesService.getById(params['id']).subscribe((data) => {
          this.post = data;
          this.postForm.setValue({
            marca: data.marca,
            modelo: data.modelo,
            annio: data.annio,
            cantPasajeros: data.cantPasajeros,
            cantFilas: data.cantFilas,
            cantAsientosPorFila: data.cantAsientosPorFila,

          });
        });
      }
    });


  }


  navigateToList() {
    this.router.navigate(['/dashboard/blog/list']);
  }

 

  submitForm() {
    if (this.postForm.valid) {
      if (this.editMode) {
        this.tipoAvionesService
          .edit(this.post._id, this.postForm.value)
          .subscribe((data) => {
            Swal.fire({
              icon: 'success',
              title: 'Modificado Correctamente',
            })
            this.navigateToList();
          });
      } else {
        console.log("paso por aca 4");
        this.tipoAvionesService.create(this.postForm.value).subscribe((data) => {
          Swal.fire({
            icon: 'success',
            title: 'Creado Correctamente',
            // text: 'Por favor rellene toda la información',
          })
          this.navigateToList();
          this.postForm.reset();
        });
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'No se permiten espacios en blanco',
        // text: 'Por favor rellene toda la información',
      })
    }
  }
}

