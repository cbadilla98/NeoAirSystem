import { Component, OnInit } from '@angular/core';
import { AsientosClaseService } from '../../../services/admin-asientosClase/asientosClase.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asientos-clase',
  templateUrl: './asientos-clase.component.html',
  styleUrls: ['./asientos-clase.component.scss']
})
export class AsientosClaseComponent implements OnInit {

  
  constructor(
    private asientosClaseService: AsientosClaseService,
    private router: Router,
    private activeRoute: ActivatedRoute
    ) { 
    
  }

  asientosClase = <any>[];

  ngOnInit(): void {
    this.asientosClaseService.get().subscribe((asientosClase: any)=>{this.asientosClase = asientosClase})
    console.log(this.asientosClase);
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
        this.asientosClaseService.delete(id).subscribe((res: any) => {
          this.asientosClase = this.asientosClase.filter((post: any) => post._id !== id);
        });;
        Swal.fire({
          title: "Eliminado correctamente!",
          icon: 'success',
        })
      }
    })
    
  }

}



// quedeé en que debo de hacer toda está pagina para que se llene la tabla de tipo de asientos clase

// hacer tres tablas que contengan todo para ser seleccionado, luego hacer el update