import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {TipoUsuario} from '../../../models/tipo-usuario'

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
})
export class UsuarioFormComponent implements OnInit {
  postForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    correo: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),
    contrasennia: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    fechaNacimiento: new FormControl('', Validators.required),
    telefonoCelular: new FormControl('', Validators.required),
    tipoUsuario: new FormControl('', Validators.required)
  });
  
  lista:TipoUsuario[]= [];
  constructor(
    private adminService: AdminService,
    private tipoUsuarioService: TipoUsuarioService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  editMode = false;
  post: any = {};

  ngOnInit(): void {
    this.tipoUsuarioService.get().subscribe((tipoUsuario) => {this.lista  = tipoUsuario});
    this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;

        this.adminService.getById(params['id']).subscribe((data) => {
          this.post = data;
          this.postForm.setValue({
            nombre: data.nombre,
            correo: data.correo,
            usuario: data.usuario,
            contrasennia: data.contrasennia,
            apellidos: data.apellidos,
            fechaNacimiento: data.fechaNacimiento,
            telefonoCelular: data.telefonoCelular,
            tipoUsuario: data.tipoUsuario,

          });
        });
      }
    });
    
    
  }
  getTipoUsuariosFromAPI(){
    this.tipoUsuarioService.get().subscribe((response)=>{
      console.log('Response from API is',response);
    },(error)=>{
      console.log('Error:',error);
    } 
    )
  }

  navigateToList() {
    this.router.navigate(['/dashboard/blog/list']);
  }

  submitForm() {
    console.log("paso por aca 1");
    if (this.postForm.valid) {
      console.log("paso por aca2 ");
      if (this.editMode) {
        console.log("paso por aca 3");
        this.adminService
          .edit(this.post._id, this.postForm.value)
          .subscribe((data) => {
            this.navigateToList();
          });
      } else {
        console.log("paso por aca 4");
        this.adminService.create(this.postForm.value).subscribe((data) => {
          this.navigateToList();
        });
      }
    }
  }
}
