import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OfertasService } from 'src/app/services/admin-ofertas/ofertas.service';
import { TiqueteService } from 'src/app/services/tiquete.service'
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { DateRangePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class OfertasComponent implements OnInit {

  constructor(private tiqueteService: TiqueteService, private ofertasService: OfertasService) { }
  ofertas = <any>[];
  tiquetesDisponibles = <any>[];

  editMode = false;

  //value tiquete
  tiquetes2: string = "";

  _idTiquete: string = "";
  _idOferta: string = "";

  formOfertas = new FormGroup({
    fechaVencimiento: new FormControl('', [Validators.required]),
    tiquetes: new FormControl(''),
    descuento: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {

    this.ofertasService.get().subscribe((ofertas) => {
      var i = 0;
      for (const oferta of ofertas) {
        if (oferta.tiquetes[0] != undefined) {
          this.ofertas[i] = oferta
          i++;
        }
      }
    });
    this.tiqueteService.get().subscribe((tiquetes) => { this.tiquetesDisponibles = tiquetes });
  }

  submitForm(): void {
    if (this.formOfertas.valid && $('#inputTiquete').val() != '') {
      if (!this.editMode) {
        this.formOfertas.controls['tiquetes'].setValue(this.tiquetes2);
        console.log(this.formOfertas.value)
        this.ofertasService.create(this.formOfertas.value).subscribe((data) => {
          Swal.fire({
            icon: 'success',
            title: 'Ruta agregada satisfactoriamente',
          })
          // this.getRutasFromAPI();
          try {
            this.ofertas = this.ofertas.filter();
          } catch (error) {

          }
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      } else {

        this.formOfertas.controls['tiquetes'].setValue(this.tiquetes2);

        console.log(this.formOfertas.value)
        this.ofertasService
          .updateOferta(this.post._id, this.formOfertas.value)
          .subscribe((data) => {
            Swal.fire({
              icon: 'success',
              title: 'Ruta editada satisfactoriamente',
            })
            // this.getRutasFromAPI();
            try {
              this.ofertas = this.ofertas.filter();
            } catch (error) {

            }
          });
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No se permiten espacios en blanco',
      })
    }
  }
  cancelar() {
    $('#btnEditar').prop("hidden", true);
    $('#btnCancelar').prop("hidden", true);
    $('#divBtnNuevo').prop("hidden", false);
    this.formOfertas.reset();
    this.editMode = false;
  }

  delete(id: any) {
    Swal.fire({
      title: 'Seguro que desea eliminar la oferta?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#16697A'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ofertasService.deleteOferta(id).subscribe((res: any) => {
          this.ofertas = this.ofertas.filter((post: any) => post._id !== id);
        });
        Swal.fire({
          title: "Oferta eliminada!",
          icon: 'success',
        })
      }
    })
  }
  verTiquete(id: string) {
    // console.log(id)
    this.tiqueteService.getById(id).subscribe((data) => {
      this._idTiquete = data._id;
      this.tiquetes2 = data._id;
      console.log(data)
    });

  }

  post: any = {};
  verRegistro(id: any) {
    this.ofertasService.getById(id).subscribe((data) => {
      this.post = data;
      this._idOferta = data._id;
      console.log(this.post)
      const datepipe: DatePipe = new DatePipe('en-US')
      const fecha = datepipe.transform(data.fechaVencimiento, 'yyyy-MM-dd')
      this.formOfertas.setValue({
        fechaVencimiento: fecha,
        tiquetes: data.tiquetes[0]._id,
        descuento: data.descuento,
      });
      this.tiquetes2 = data.tiquetes[0]._id
      $('#btnEditar').prop("hidden", false);
      $('#btnCancelar').prop("hidden", false);
      $('#divBtnNuevo').prop("hidden", true);
      this.editMode = true;
    });
  }


}
