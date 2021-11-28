import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AvionesService } from 'src/app/services/admin-aviones/aviones.service';
import { RutasService } from '../../../services/admin-rutas/rutas.service';
import * as $ from 'jquery';
import { formatDate } from '@angular/common';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;

@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

  fromModel(value: string | null): NgbTimeStruct | null {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  toModel(duracion: NgbTimeStruct | null): string | null {
    return duracion != null ? `1995-12-17T${pad(duracion.hour)}:${pad(duracion.minute)}:${pad(duracion.second)}` : null;
  }
}
@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss'],
  providers: [{ provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter }]
})

export class RutasComponent implements OnInit {

  constructor(private rutasService: RutasService, private avionesService: AvionesService) { }
  rutas = <any>[];
  arrayAviones = <any>[];
  //Si una ruta esta seleccionada
  _idRuta: string = '';
  editMode = false;
  // time = {hour: '', minute: ''};
  formRutas = new FormGroup({
    salida: new FormControl('', [Validators.required]),
    destino: new FormControl('', [Validators.required]),
    duracion: new FormControl('', Validators.required),
    aviones: new FormControl('', Validators.required),
  });


  ngOnInit(): void {
    this.getRutasFromAPI();
    this.avionesService.get().subscribe((aviones) => { this.arrayAviones = aviones });
  }
  delete(id: any) {
    Swal.fire({
      title: 'Seguro que desea eliminar la ruta?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#16697A'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rutasService.deleteRutas(id).subscribe((res: any) => {
          this.rutas = this.rutas.filter((post: any) => post._id !== id);
        });
        Swal.fire({
          title: "Ruta eliminada!",
          icon: 'success',
        })
      }
    })
  }
  //Ver rutas
  post: any = {};
  verRegistro(id: any) {
    this.rutasService.getById(id).subscribe((data) => {
      this.post = data;
      const datepipe: DatePipe = new DatePipe('en-US')
      let formattedDate = datepipe.transform(data.duracion, 'HH:mm:ss')
      this._idRuta = data._id;
      // console.log(this._idRuta);
      this.formRutas.setValue({
        salida: data.salida,
        destino: data.destino,
        duracion: formattedDate,
        aviones: data.aviones,
      });
      $('#btnEditar').prop("hidden", false);
      $('#btnCancelar').prop("hidden", false);
      $('#divBtnNuevo').prop("hidden", true);
      this.editMode = true;
    });
  }

  cancelar() {
    $('#btnEditar').prop("hidden", true);
    $('#btnCancelar').prop("hidden", true);
    $('#divBtnNuevo').prop("hidden", false);
    this.formRutas.reset();
    this.editMode = false;
  }

  submitForm() {
    if (this.formRutas.valid) {
      if (!this.editMode) {
        this.rutasService.create(this.formRutas.value).subscribe((data) => {
          Swal.fire({
            icon: 'success',
            title: 'Ruta agregada satisfactoriamente',
          })
          this.getRutasFromAPI();
          try {
            this.rutas = this.rutas.filter();
          } catch (error) {

          }
        });
      } else {
        this.rutasService
          .updateRutas(this.post._id, this.formRutas.value)
          .subscribe((data) => {
            Swal.fire({
              icon: 'success',
              title: 'Ruta editada satisfactoriamente',
            })
            this.getRutasFromAPI();
            try {
              this.rutas = this.rutas.filter();
            } catch (error) {

            }
          });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No se permiten espacios en blanco',
      })
    }
  }

  getRutasFromAPI() {
    this.rutasService.get().subscribe((rutas) => {

      var i = 0;
      for (const ruta of rutas) {
        if (ruta.aviones[0] != undefined) {
          this.rutas[i] = ruta
          i++;
        }
      }
      console.log(this.rutas);


      // this.rutas = rutas
    })
  }
}
