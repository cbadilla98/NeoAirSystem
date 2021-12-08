import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class OfertasComponent implements OnInit {

  constructor() { }
  formOfertas = new FormGroup({
    fechaVencimiento: new FormControl('', [Validators.required]),
    descuento: new FormControl('', [Validators.required]),


    // salida: new FormControl('', [Validators.required]),
    // destino: new FormControl('', [Validators.required]),
    // duracion: new FormControl('', Validators.required),
    // aviones: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
  }

  submitForm(): void {

  }
  cancelar() {}
}
