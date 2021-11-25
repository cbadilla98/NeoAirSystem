import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AvionesService } from 'src/app/services/admin-aviones/aviones.service';
import { RutasService } from '../../../services/admin-rutas/rutas.service';
import * as $ from 'jquery';
import { formatDate } from '@angular/common';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import Swal from'sweetalert2';

const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;

@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

  fromModel(value: string | null): NgbTimeStruct | null {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  toModel(duracion: NgbTimeStruct | null): string | null {
    return duracion != null ? `1995-12-17T${pad(duracion.hour)}:${pad(duracion.minute)}:${pad(duracion.second)}` : null;
  }
}
@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss'],
  providers: [{ provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter }]
})

export class RutasComponent implements OnInit {

  constructor(private rutasService: RutasService, private avionesService: AvionesService) { }
  rutas = <any>[];
  arrayAviones = <any>[];
  // time = {hour: '', minute: ''};
  formRutas = new FormGroup({
    salida: new FormControl('', [Validators.required, Validators.minLength(3)]),
    destino: new FormControl('', [Validators.required, Validators.minLength(3)]),
    duracion: new FormControl('', Validators.required),
    aviones: new FormControl('', Validators.required),
  });


  ngOnInit(): void {
    this.rutasService.get().subscribe((rutas) => { this.rutas = rutas });
    this.avionesService.get().subscribe((aviones) => { this.arrayAviones = aviones });



    $("#btnEliminar").on('click', function () {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    })
  }
  submitForm() {
    if (this.formRutas.valid) {
      console.log("Valido");
      this.rutasService.create(this.formRutas.value).subscribe((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Ruta agregada satisfactoriamente',
        })
        this.formRutas.reset();
        window.location.reload();
        // this.navigateToList();
      });
    } else {
      console.log("No valido");
      Swal.fire({
        icon: 'error',
        title: 'No se permiten espacios en blanco',
        // text: 'Por favor rellene toda la información',
      })
    }
  }
}
