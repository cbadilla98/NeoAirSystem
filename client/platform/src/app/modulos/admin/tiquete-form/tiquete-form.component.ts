import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TiqueteService } from '../../../services/tiquete.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClasesService } from 'src/app/services/admin-clases/clases.service';
import { AvionesService } from 'src/app/services/admin-aviones/aviones.service';
import {TipoTiqueteService} from 'src/app/services/tipo-tiquete.service'

import { ActivatedRoute } from '@angular/router';
import {TipoUsuario} from '../../../models/tipo-usuario'
import {Aviones} from '../../../models/aviones'
import {TipoTiquete} from '../../../models/tipo-tiquete'
import {Clases} from '../../../models/clases'
@Component({
  selector: 'app-tiquete-form',
  templateUrl: './tiquete-form.component.html',
  styleUrls: ['./tiquete-form.component.scss']
})
export class TiqueteFormComponent implements OnInit {
  postForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(10)]),
    precio: new FormControl('', [Validators.required]),
    salida: new FormControl('', Validators.required),
    destino: new FormControl('', Validators.required),
    fechaSalida: new FormControl('', Validators.required),
    aviones: new FormControl('', Validators.required),
    clases: new FormControl('', Validators.required),
    tipoTiquete: new FormControl('', Validators.required),
    
    
  });
  labelAviones=''
  labelClase=''
  labelTipoTiquete=''
  
  
  lista:TipoUsuario[]= [];
  listaAviones:Aviones[]=[];
  listaClases:Clases[]=[];
  listaTipoTiquetes:TipoTiquete[]=[];
  constructor(
    private clasesService: ClasesService,
    private avionesService: AvionesService,
    private tipoTiqueteService: TipoTiqueteService,
    private tiqueteService: TiqueteService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  editMode = false;
  post: any = {};
//INIT---------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.tiqueteService.get().subscribe((tiquete) => {this.lista  = tiquete});
    this.avionesService.get().subscribe((aviones)=> {this.listaAviones  = aviones});
    this.tipoTiqueteService.get().subscribe((tipoTiquete)=> {this.listaTipoTiquetes  = tipoTiquete});
    this.clasesService.get().subscribe((clases)=> {this.listaClases  = clases});
    this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;

        this.tiqueteService.getById(params['id']).subscribe((data) => {
          var date= new Date(data.fechaSalida)
          this.post = data;
          //Aviones
          var jsonSAv=JSON.stringify(data.aviones);
          var str=jsonSAv.substring(1,jsonSAv.length-1);
          var jsonJAv=JSON.parse(str);
          var jsonAAv=JSON.parse(jsonSAv);
          //Clase
          var jsonSCl=JSON.stringify(data.aviones);
          console.log(jsonSCl);
          var str=jsonSCl.substring(1,jsonSCl.length-1);
          var jsonJCl=JSON.parse(str);
          var jsonACl=JSON.parse(jsonSCl);
          //TipoTiquete
          var jsonSTi=JSON.stringify(data.aviones);
          var str=jsonSTi.substring(1,jsonSTi.length-1);
          var jsonJTi=JSON.parse(str);
          var jsonATi=JSON.parse(jsonSTi);
          this.postForm.setValue({
            nombre: data.nombre,
            precio: data.precio,
            salida: data.salida,
            destino: data.destino,
            fechaSalida: date.toISOString().split('T')[0],
            aviones: this.avionesService.getById(params[jsonJAv._id]),
            clases: this.clasesService.getById(params[jsonJCl._id]),
            tipoTiquete: this.tipoTiqueteService.getById(params[jsonJTi._id]),
            
            
            
          });
          
          var jsonSAv=JSON.stringify(data.aviones);
          
          var str=jsonSAv.substring(1,jsonSAv.length-1);
          var jsonJAv=JSON.parse(str);
          var jsonAAv=JSON.parse(jsonSAv);
          
          for(var i = 0; i < jsonJAv.length; i++) {
            var obj = jsonAAv[i];
            console.log(obj._id);
          }
          
          this.labelAviones=jsonJAv.descripcion;
//---------------------------------------Clase---------------------------------
         console.log( jsonJCl.nombre);
         console.log("AAAAAAAA");
          var jsonSCl=JSON.stringify( this.clasesService.getById(params[jsonJCl._id]));
          
          var str=jsonSCl

          var jsonJCl=JSON.parse(str);
          var jsonACl=JSON.parse(jsonSCl);
          
          for(var i = 0; i < jsonJCl.length; i++) {
            var obj = jsonACl[i];
            console.log(obj._id);
        }
        console.log(this.clasesService.getById(jsonJCl._id));
        console.log("CCCCC");
          this.labelClase=jsonJCl.nombre;

          //-----------------------------------------TipoTiquete-----------------------
          var jsonSTi=JSON.stringify(data.tipoTiquete);
          
          var str=jsonSTi.substring(1,jsonSTi.length-1);
          var jsonJTi=JSON.parse(str);
          var jsonATi=JSON.parse(jsonSTi);
          console.log(str);
          console.log(jsonATi[0]);
          console.log(jsonJTi._id);
          console.log(this.tiqueteService.getById(jsonJTi._id))
          for(var i = 0; i < jsonJTi.length; i++) {
            var obj = jsonATi[i];
            console.log(obj._id);
        }
          this.labelTipoTiquete=jsonJTi.nombre;

          this.postForm.controls['tipoTiquete'].patchValue(this.tipoTiqueteService.getById(jsonJTi._id),500)
          this.postForm.controls['clases'].patchValue(this.clasesService.getById(jsonJTi._id),500)
          this.postForm.controls['aviones'].patchValue(this.avionesService.getById(jsonJTi._id),500)
        });
        
      }else{
        
      }
    });
    
  
  
 }
 //INIT -

 compareFn(c1: any, c2:any): boolean {     
  return c1 && c2 ? c1.id === c2.id : c1 === c2; 
}

  getTipoUsuariosFromAPI(){
    this.tiqueteService.get().subscribe((response)=>{
      console.log('Response from API is',response);
    },(error)=>{
      console.log('Error:',error);
    } 
    )
  }

  navigateToList() {
    this.router.navigate(['tiquete']);
  }

  submitForm() {
    console.log("paso por aca 1");
    if (this.postForm.valid) {
      
      console.log("paso por aca2 ");
      if (this.editMode) {
        console.log("paso por aca 3");
        
        this.tiqueteService
          .edit(this.post._id, this.postForm.value)
          .subscribe((data) => {
            this.navigateToList();
          });
      } else {
        console.log("paso por aca 4");
        this.tiqueteService.create(this.postForm.value).subscribe((data) => {
          this.navigateToList();
        });
      }
    }
  }
  ngAfterViewInit(): void {
    
  }
 
  cancelar(){
    this.router.navigate(['admin'])
  }

}
