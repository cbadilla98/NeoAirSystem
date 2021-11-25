import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoAvionesService } from 'src/app/services/admin-tipoAviones/tipoAviones.service';

interface ITipoAviones {
  marca: '';
  modelo: '';
  annio: 0;
  cantPasajeros: 0; 
  cantFilas: 0;
  cantAsientosFila: 0; 
}

@Component({
  selector: 'app-tipo-avion-form',
  templateUrl: './tipo-avion-form.component.html',
  styleUrls: ['./tipo-avion-form.component.scss']
})
export class TipoAvionFormComponent implements OnInit {

  constructor(private tipoAvionesService: TipoAvionesService) { }

  tipoAviones: ITipoAviones = {
    marca: '',
    modelo: '',
    annio: 0,
    cantPasajeros: 0,
    cantFilas: 0,
    cantAsientosFila: 0,
  }

  ngOnInit(): void {
  }

  tipoAvionForm = new FormGroup({
    // definición de los campos del formulario, el valor inicial ('') y el tipo de validación (requerido)
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    annio: new FormControl('', Validators.required),
    cantPasajeros: new FormControl('', Validators.required),
    cantFilas: new FormControl('', Validators.required),
    cantAsientosFila: new FormControl('', Validators.required),
  });

  submitForm() {
    //validamos el formulario primeramente
    if (this.tipoAvionForm.valid) {
      // llamamos al servicio pasando el id del post y el valor del formulario que contien
      // los campos que definimos anteriormente
      this.tipoAvionesService
        .addTipoAvion(this.tipoAviones.marca, this.tipoAviones.modelo,this.tipoAviones.annio, true ,this.tipoAviones.cantPasajeros, this.tipoAviones.cantFilas, this.tipoAviones.cantAsientosFila)
        .subscribe((data) => {
          this.tipoAviones = data;
          this.tipoAvionForm.reset();
        });
    }
  }

}
