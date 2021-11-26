import { Component, OnInit } from '@angular/core';
import { TipoAvionesService } from 'src/app/services/admin-tipoAviones/tipoAviones.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipo-avion',
  templateUrl: './tipo-avion.component.html',
  styleUrls: ['./tipo-avion.component.scss']
})
export class TipoAvionComponent implements OnInit {

  constructor(
    private tipoAvionesService: TipoAvionesService,
    private router: Router,
    private activeRoute: ActivatedRoute
    ) { 
    
  }

  tipoAviones = <any>[];

  ngOnInit(): void {
    this.tipoAvionesService.get().subscribe((tipoAviones)=>{this.tipoAviones = tipoAviones});
  }

  editar(id : String){
    this.router.navigate(['tipoAvionesForm/' + id])
  }

  delete(id: string): void {
    if (confirm('¿Esta seguro que quiere borrar este registro?')) {
      this.tipoAvionesService.deleteTipoAvion(id).subscribe((res: any) => {
        this.tipoAviones = this.tipoAviones.filter((post: any) => post._id !== id);
      });
    }
  }

}
