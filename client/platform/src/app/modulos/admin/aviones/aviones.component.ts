import { Component, OnInit } from '@angular/core';
import { AvionesService } from 'src/app/services/admin-aviones/aviones.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-aviones',
  templateUrl: './aviones.component.html',
  styleUrls: ['./aviones.component.scss']
})
export class AvionesComponent implements OnInit {

  constructor(
    private AvionesService: AvionesService,
    private router: Router,
    private activeRoute: ActivatedRoute
    ) { 
    
  }

  aviones = <any>[];

  ngOnInit(): void {
    this.AvionesService.get().subscribe((aviones)=>{this.aviones = aviones});
  }

  editar(id : String){
    this.router.navigate(['avionesForm/' + id])
  }

  deleteAvion(id: string): void {
    Swal.fire({
      title: 'Seguro que desea eliminarlo?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#16697A'
    }).then((result) => {
      if (result.isConfirmed) {
        this.AvionesService.deleteAvion(id).subscribe((res: any) => {
          this.aviones = this.aviones.filter((post: any) => post._id !== id);
        });;
        Swal.fire({
          title: "Avión eliminado!",
          icon: 'success',
        })
      }
    })
    
  }

}
