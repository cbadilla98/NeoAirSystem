import { Component, OnInit } from '@angular/core';
import { RutasService } from '../../../services/admin-rutas/rutas.service';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss']
})
export class RutasComponent implements OnInit {

  constructor(private rutasService: RutasService) { }
  rutas =  <any>[];
  ngOnInit(): void {
    this.rutasService.get().subscribe((rutas)=>{this.rutas = rutas});
    // console.log("paso por aca");
    console.log(this.rutas);
  }

}
