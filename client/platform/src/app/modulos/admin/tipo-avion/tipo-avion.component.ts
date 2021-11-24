import { Component, OnInit } from '@angular/core';
import { TipoAvionesService } from 'src/app/services/admin-tipoAviones/tipoAviones.service';

@Component({
  selector: 'app-tipo-avion',
  templateUrl: './tipo-avion.component.html',
  styleUrls: ['./tipo-avion.component.scss']
})
export class TipoAvionComponent implements OnInit {

  constructor(private tipoAvionesService: TipoAvionesService) { 

  }

  tipoAviones = <any>[];

  ngOnInit(): void {
    this.tipoAvionesService.get().subscribe((tipoAviones)=>{this.tipoAviones = tipoAviones});
  }

}
