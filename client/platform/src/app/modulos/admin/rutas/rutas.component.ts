import { Component, OnInit } from '@angular/core';
import { AvionesService } from 'src/app/services/admin-aviones/aviones.service';
import { RutasService } from '../../../services/admin-rutas/rutas.service';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss']
})
export class RutasComponent implements OnInit {

  constructor(private rutasService: RutasService, private avionesService: AvionesService) { }
  rutas =  <any>[];
  aviones = <any>[];
  ngOnInit(): void {
    this.rutasService.get().subscribe((rutas)=>{this.rutas = rutas});
    this.avionesService.get().subscribe((aviones)=>{this.aviones = aviones});
    // console.log("paso por aca");
    // console.log(this.rutas);
  }

}
