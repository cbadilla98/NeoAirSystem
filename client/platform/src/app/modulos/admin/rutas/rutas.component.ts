import { Component, OnInit } from '@angular/core';
import { AvionesService } from 'src/app/services/admin-aviones/aviones.service';
import { RutasService } from '../../../services/admin-rutas/rutas.service';
import * as $ from 'jquery';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss']
})
export class RutasComponent implements OnInit {

  constructor(private rutasService: RutasService, private avionesService: AvionesService) { }
  rutas =  <any>[];
  aviones = <any>[];
  
  formRutas: any = {
    salida: null,
    destino: null,
    time: {hour: 12, minute: 12},

  }

  ngOnInit(): void {
    this.rutasService.get().subscribe((rutas)=>{this.rutas = rutas});
    this.avionesService.get().subscribe((aviones)=>{this.aviones = aviones});

    // console.log("paso por aca");
    // console.log(this.rutas);

    // var x:any = document.getElementById("btnEditar");
    // x.addEventListener("click",function() {
    //   console.log("hola")
    // });

    $("#btnEditar").on('click',function() {
      // console.log(avion);
    })
  }

}
