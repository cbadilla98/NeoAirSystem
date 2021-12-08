
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ClasesService} from '../../../services/admin-clases/clases.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.scss']
})
export class ClaseComponent implements OnInit {

  postForm = new FormGroup({

    nombre: new FormControl('', Validators.required),
  });

  get nombre() {
    return this.postForm.get('nombre');
  }

  constructor(
    private clasesService: ClasesService,
    private router: Router,
    private activeRoute: ActivatedRoute
    
    ) { 
    
  }

  editMode = false;
  lista = <any>[];
  post: any = {};
  ngOnInit(): void {
    
    this.clasesService.get().subscribe((lista: any)=>{this.lista = lista});
    

    this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.clasesService.getById(params['id']).subscribe((data) => {
          this.post = data;
          this.postForm.setValue({
            nombre: data.nombre,

          });
        });
      }
    });
  }

  submitForm() {
    if (this.postForm.valid) {
      if (this.editMode) {
        this.clasesService
          .edit(this.post._id, this.postForm.value)
          .subscribe((data) => {
            Swal.fire({
              icon: 'success',
              title: 'Modificado Correctamente',
            })
            this.editar("");
            console.log("1")
          });
      } else {
        this.clasesService.create(this.postForm.value).subscribe((data) => {
          Swal.fire({
            icon: 'success',
            title: 'Creado Correctamente',
            // text: 'Por favor rellene toda la información',
          })
          this.postForm.reset();
        });
        window.location.reload();
        
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'No se permiten espacios en blanco',
        // text: 'Por favor rellene toda la información',
      })
    }
    
    
  }

  navigateToList() {
    this.router.navigate(['clases']);
  }

  editar(id : String){
    this.router.navigate(['clases/' + id])
    
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
        this.clasesService.delete(id).subscribe((res: any) => {
          this.lista = this.lista.filter((post: any) => post._id !== id);
        });;
        Swal.fire({
          title: "Eliminado!",
          icon: 'success',
        })
      }
    })
    this.postForm.reset();
    
  }

}

