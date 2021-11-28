import { Component, OnInit } from '@angular/core';
import { TipoAvionesService } from 'src/app/services/admin-tipoAviones/tipoAviones.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Seguro que desea eliminarlo?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#16697A'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoAvionesService.deleteTipoAvion(id).subscribe((res: any) => {
          this.tipoAviones = this.tipoAviones.filter((post: any) => post._id !== id);
        });;
        Swal.fire({
          title: "Tipo de Avión eliminado!",
          icon: 'success',
        })
      }
    })
    
  }

}
