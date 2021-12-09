import { Component, OnInit } from '@angular/core';
import { AsientosClaseService } from '../../../services/admin-asientosClase/asientosClase.service';
import { ClasesService} from '../../../services/admin-clases/clases.service';
import { TipoAvionesService } from 'src/app/services/admin-tipoAviones/tipoAviones.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-asientos-clase',
  templateUrl: './asientos-clase.component.html',
  styleUrls: ['./asientos-clase.component.scss']
})
export class AsientosClaseComponent implements OnInit {

  labelTipoAvion = "";
  labelClase = "";
  
  constructor(
    private asientosClaseService: AsientosClaseService,
    private clasesService: ClasesService,
    private tipoAvionesService: TipoAvionesService,
    private router: Router,
    private activeRoute: ActivatedRoute
    ) { 
    
  }

  postForm = new FormGroup({

    cantidadPasajeros: new FormControl('', Validators.required),
    cantidadFilas: new FormControl('', Validators.required),
    cantidadAsientosPorFila: new FormControl('', Validators.required),
    tipoAviones: new FormControl(''),
    clase: new FormControl(''),
  });

  get cantPasajeros() {
    return this.postForm.get('cantPasajeros');
  }
  get cantFilas() {
    return this.postForm.get('cantFilas');
  }
  get cantAsientosPorFila() {
    return this.postForm.get('cantAsientosPorFila');
  }

  editMode = false;
  asientos = <any>[];
  clases = <any>[];
  tipoAviones = <any>[];
  post : any = {};
  ngOnInit(): void {
    
    this.asientosClaseService.get().subscribe((response)=>{
      this.asientos = response;
    },(error)=>{
      console.log('Error:',error);
    } 
    )
    this.clasesService.get().subscribe((clasesService)=>{this.clases = clasesService})
    this.tipoAvionesService.get().subscribe((tipoAvionesService)=>{this.tipoAviones = tipoAvionesService})

    this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;

        this.asientosClaseService.getById(params['id']).subscribe((response)=>{

          this.post = response;
          this.labelTipoAvion = (this.post.tipoAviones[0].marca) + " - " + (this.post.tipoAviones[0].modelo);
          this.labelClase = (this.post.clase[0].nombre);
          this.postForm.setValue({
            cantidadPasajeros: this.post.cantidadPasajeros,
            cantidadFilas: this.post.cantidadFilas,
            cantidadAsientosPorFila: this.post.cantidadAsientosPorFila,
            tipoAviones: "",
            clase: ""

          });
          
        })
        
      }
    });
  }

  editar(id : String){
    this.router.navigate(['asientosClase/' + id])
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
          this.asientos = this.asientos.filter((post: any) => post._id !== id);
        });;
        Swal.fire({
          title: "Eliminado correctamente!",
          icon: 'success',
        })
      }
    })
    
  }

  

  submitForm() {
    if (this.postForm.valid) {
      if (this.editMode) {
        this.asientosClaseService
          .edit(this.post._id, this.postForm.value)
          .subscribe((data) => {
            Swal.fire({
              icon: 'success',
              title: 'Modificado Correctamente',
            })
            this.editar("");
            this.postForm.reset();
          });
      } else {
        this.asientosClaseService.create(this.postForm.value).subscribe((data) => {
          Swal.fire({
            icon: 'success',
            title: 'Creado Correctamente',
            // text: 'Por favor rellene toda la información',
          })
          this.editar("");
          this.postForm.reset();
          window.location.reload();
        });
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'No se permiten espacios en blanco',
        // text: 'Por favor rellene toda la información',
      })
    }
  }

}

