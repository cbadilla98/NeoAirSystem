
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AvionesService } from 'src/app/services/admin-aviones/aviones.service'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoAvionesService } from 'src/app/services/admin-tipoAviones/tipoAviones.service';

@Component({
  selector: 'app-aviones-form',
  templateUrl: './aviones-form.component.html',
  styleUrls: ['./aviones-form.component.scss']

})


export class AvionesFormComponent implements OnInit {
  labelTipoAvion = "";
  postForm = new FormGroup({

    tipoAviones: new FormControl(''),
    descripcion: new FormControl('', Validators.required)
  });

  get descripcion() {
    return this.postForm.get('descripcion');
  }

  constructor(
    private avionesService: AvionesService,
    private tipoAvionesService: TipoAvionesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  editMode = false;
  lista: any = [];
  listaAviones: any =[];
  ngOnInit(): void {
    this.tipoAvionesService.get().subscribe((lista) => {this.lista  = lista});
    this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.avionesService.getById(params['id']).subscribe((data) => {
          this.listaAviones = data;
          this.postForm.setValue({
            
            descripcion: this.listaAviones.descripcion
          });
        });
      }
      
    });


  }


  navigateToList() {
    
  }

 

  submitForm() {
    if (this.postForm.valid) {
      if (this.editMode) {
        this.avionesService
          .edit(this.lista._id, this.postForm.value)
          .subscribe((data) => {
            Swal.fire({
              icon: 'success',
              title: 'Modificado Correctamente',
            })
            this.navigateToList();
          });
      } else {
        console.log(this.postForm.get("tipoAvion")?.value['_id']);
        this.avionesService.create(this.postForm.value).subscribe((data) => {
          Swal.fire({
            icon: 'success',
            title: 'Creado Correctamente',
            // text: 'Por favor rellene toda la información',
          })
          this.navigateToList();
          this.postForm.reset();
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
