import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {TipoUsuario} from '../../../models/tipo-usuario'
import { data } from 'jquery';
declare const google: any;
@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
})
export class UsuarioFormComponent implements OnInit, AfterViewInit {
  postForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    usuario: new FormControl('', Validators.required),
    contrasennia: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    fechaNacimiento: new FormControl('', Validators.required),
    telefonoCelular: new FormControl('', Validators.required),
    tipoUsuario: new FormControl('', Validators.required),
    lt: new FormControl(''),
    ln: new FormControl(''),
  });
 
  
  //mapa
  zoom = 12
  center: google.maps.LatLngLiteral = {
    lat:0,
    lng:0
  }
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }
  positionMarcador = {
    lat: 0,
    lng: 0
  }
  label= {
    color: 'black',
    text: 'Seleccione el lugar donde vive',
  }
  title= 'Marker title '
  optionsMarcador=  { animation: google.maps.Animation.BOUNCE, draggable: true}
  
  // addMarker() {
  //   markers= 
  //   markers.push({
  //     position: {
  //       lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
  //       lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
  //     },
  //     label: {
  //       color: 'red',
  //       text: 'Marker label ' + (this.markers.length + 1),
  //     },
  //     title: 'Marker title ' + (this.markers.length + 1),
  //     options: { animation: google.maps.Animation.BOUNCE },
  //   })
  // }

  //mapa--------------------------------------------------------------------------------------------------
  lista:TipoUsuario[]= [];
  constructor(
    private adminService: AdminService,
    private tipoUsuarioService: TipoUsuarioService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  editMode = false;
  post: any = {};
//INIT---------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.tipoUsuarioService.get().subscribe((tipoUsuario) => {this.lista  = tipoUsuario});
    this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;

        this.adminService.getById(params['id']).subscribe((data) => {
          var date= new Date(data.fechaNacimiento)
          this.post = data;
          this.postForm.setValue({
            nombre: data.nombre,
            correo: data.correo,
            usuario: data.usuario,
            contrasennia: data.contrasennia,
            apellidos: data.apellidos,
            fechaNacimiento: date.toISOString().split('T')[0],
            telefonoCelular: data.telefonoCelular,
            tipoUsuario: data.tipoUsuario,
            lt: data.lt,
            ln: data.ln
          });
          this.positionMarcador = {
            lat: data.lt,
            lng: data.ln,
          }
          this.center = {
            lat: data.lt,
            lng: data.ln,
          }
        });
        
      }else{
        navigator.geolocation.getCurrentPosition((position) => {
          this.positionMarcador = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
      })
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
    })
      }
    });
    
  
  
 }
 //INIT -

 

  getTipoUsuariosFromAPI(){
    this.tipoUsuarioService.get().subscribe((response)=>{
      console.log('Response from API is',response);
    },(error)=>{
      console.log('Error:',error);
    } 
    )
  }

  navigateToList() {
    this.router.navigate(['admin']);
  }

  submitForm() {
    console.log("paso por aca 1");
    if (this.postForm.valid) {
      this.postForm.patchValue({
        lt:this.positionMarcador.lat,
        ln:this.positionMarcador.lng
      })
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
  ngAfterViewInit(): void {
    
  }
  dragend($event:google.maps.MapMouseEvent):void {
    var clickedLat = $event.latLng;
    var lat = clickedLat?.lat();
    var lng = clickedLat?.lng();
    
    if(typeof lat == 'number'){
      this.positionMarcador.lat=lat;
    }
    if(typeof lng == 'number'){
      this.positionMarcador.lng=lng;
    }
    

  }
}
