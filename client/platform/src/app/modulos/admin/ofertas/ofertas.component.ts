import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class OfertasComponent implements OnInit {

  constructor() { }
  ofertas = <any>[];
  tiquetesDisponibles = <any>[];
  formOfertas = new FormGroup({
    fechaVencimiento: new FormControl('', [Validators.required]),
    descuento: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
  }

  submitForm(): void {

  }
  cancelar() { }

  delete(id: any) {

  }
  post: any = {};
  verRegistro(id: any) {
    
  }
}
