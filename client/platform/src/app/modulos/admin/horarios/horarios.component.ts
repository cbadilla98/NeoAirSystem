import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RutasService } from '../../../services/admin-rutas/rutas.service';
import { HorarioService } from '../../../services/admin-horarios/horario.service'
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit {

  // model: NgbDateStruct;
  // date: {year: number, month: number};

  constructor(private rutasService: RutasService, private horarioService: HorarioService) { }
  rutasDisponibles = <any>[];
  horarios = <any>[];

  //Obtener el id de la ruta al seleccionar
  _idRuta: string = '';
  // _tiempoRuta: any;
  ruta: any;
  //Editar
  editMode = false;

  //fecha de duracion de ruta formateada
  formattedDate: any = ''
  fechaInicial: any

  //Obtener horario de la ruta
  _idHorario: string = ''

  formHorario = new FormGroup({
    fechaHoraSalida: new FormControl('', [Validators.required]),
    rutas: new FormControl('')
  });

  ngOnInit(): void {
    this.rutasService.get().subscribe((rutas) => {
      // this.rutasDisponibles = rutas
      var i = 0;
      for (const ruta of rutas) {
        if (ruta.aviones[0] != undefined) {
          this.rutasDisponibles[i] = ruta
          i++;
        }
      }
    })
    this.getHorariosFromAPI()
  }


  sumarFecha(fecha: any, hora: any, minutos: any): any {
    if(this.editMode){
      // console.log(new Date())
      fecha = new Date(fecha)
    }
    var nuevaHora = fecha.getHours() + hora;
    var nuevoMinuto = fecha.getMinutes() + minutos;
    fecha.setHours(nuevaHora, nuevoMinuto);
    const datepipe: DatePipe = new DatePipe('en-US')
    // return datepipe.transform(fecha, 'M/d/yy, h:mm a')
    return fecha
  }
  get rutas() {
    return this.formHorario.get('rutas');
  }
  submitForm() {
    // console.log(typeof this.formHorario.value.fechaHoraSalida)
    if (this.formHorario.valid && $('#inputRuta').val() != '') {

      if (!this.editMode) {
        // this.formHorario.value.fechaHoraSalida
        var horarioInicial = this.formHorario.value.fechaHoraSalida
        var arrayTiempo = this.formattedDate.split(':');
        const datepipe: DatePipe = new DatePipe('en-US')
        let horarioInicialFormated = datepipe.transform(horarioInicial, 'M/d/yy, h:mm a')
        let horarioFinalFormated = this.sumarFecha(horarioInicial, Math.abs(arrayTiempo[0]), Math.abs(arrayTiempo[1]))
        let ruta = this._idRuta;
        this.formHorario.addControl('fechaHoraLlegada', new FormControl(horarioFinalFormated))
        this.formHorario.controls['rutas'].setValue(ruta);
        this.formHorario.controls['fechaHoraSalida'].setValue(horarioInicialFormated);
        this.formHorario.controls['fechaHoraLlegada'].setValue(horarioFinalFormated);

        console.log(this.formHorario.value)

        this.horarioService.create(this.formHorario.value).subscribe((data) => {
          Swal.fire({
            icon: 'success',
            title: 'Horario agregado satisfactoriamente',
          })
          this.getHorariosFromAPI();
          try {
            this.horarios = this.horarios.filter();
          } catch (error) {

          }
        });
        setTimeout(() => {
          window.location.reload();
        },1000)
      } else {
        var horarioInicial = this.formHorario.value.fechaHoraSalida
        var arrayTiempo = this.formattedDate.split(':');
        const datepipe: DatePipe = new DatePipe('en-US')
        let horarioInicialFormated = datepipe.transform(horarioInicial, 'M/d/yy, h:mm a')
        let horarioFinalFormated = this.sumarFecha(horarioInicialFormated, Math.abs(arrayTiempo[0]), Math.abs(arrayTiempo[1]))
        let ruta = this._idRuta;
        this.formHorario.addControl('fechaHoraLlegada', new FormControl(horarioFinalFormated))
        this.formHorario.controls['rutas'].setValue(ruta);
        this.formHorario.controls['fechaHoraSalida'].setValue(horarioInicialFormated);
        this.formHorario.controls['fechaHoraLlegada'].setValue(horarioFinalFormated);
        
        this.horarioService
          .updateHorario(this.post._id, this.formHorario.value)
          .subscribe((data) => {
            Swal.fire({
              icon: 'success',
              title: 'Horario editado satisfactoriamente',
            })
            this.getHorariosFromAPI();
            try {
              this.horarios = this.horarios.filter();
            } catch (error) {

            }
          });
          setTimeout(() => {
            window.location.reload();
          },1000)

      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No se permiten espacios en blanco',
      })
    }
  }


  verRuta(id: string) {
    this.rutasService.getById(id).subscribe((data) => {
      this._idRuta = data._id;
      const datepipe: DatePipe = new DatePipe('en-US')
      this.formattedDate = datepipe.transform(data.duracion, 'HH:mm:ss')
      this.ruta = data.salida + " - " + data.destino;
    });

  }
  cancelar() {
    $('#btnEditar').prop("hidden", true);
    $('#btnCancelar').prop("hidden", true);
    $('#divBtnNuevo').prop("hidden", false);
    this.formHorario.reset();
    this.editMode = false;
  }
  getHorariosFromAPI() {
    this.horarioService.get().subscribe((horarios) => {
      var i = 0;
      for (const horario of horarios) {
        if (horario.rutas[0] != undefined) {
          this.horarios[i] = horario
          i++;
        }
      }
      console.log(this.horarios);
    })
  }
  delete(id: any) {
    Swal.fire({
      title: 'Seguro que desea eliminar el horario?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#16697A'
    }).then((result) => {
      if (result.isConfirmed) {
        this.horarioService.deleteHorario(id).subscribe((res: any) => {
          this.horarios = this.horarios.filter((post: any) => post._id !== id);
        });
        Swal.fire({
          title: "Horario eliminado!",
          icon: 'success',
        })
      }
    })
  }
  post: any = {};
  verRegistro(id: any) {
    this.horarioService.getById(id).subscribe((data) => {
      this.post = data;
      this._idHorario = data._id;
      console.log(this.post)
      // const datepipe: DatePipe = new DatePipe('en-US')
      // this.formattedDate = datepipe.transform(data.fechaHoraSalida, 'M/d/yy, h:mm a')
      this.formHorario.setValue({
        fechaHoraSalida: data.fechaHoraSalida,
        rutas: data.rutas[0]._id,
      });
      // this.ruta = data.rutas[0]._id
      this._idRuta = data.rutas[0]._id
      this.formHorario.controls['fechaHoraSalida'].setValue(data.fechaHoraSalida);

      // this.formHorario.value.fechaHoraSalida
      $('#btnEditar').prop("hidden", false);
      $('#btnCancelar').prop("hidden", false);
      $('#divBtnNuevo').prop("hidden", true);
      this.editMode = true;
    });
  }

}
