

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InicioService } from 'src/app/services/inicio.service';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: any = {
    salida: null,
    destino: null,
    fechaSalida:null,
  };
  // postForm = new FormGroup({
    
  //   usuario: new FormControl('', Validators.required),
  //   contrasennia: new FormControl('', Validators.required),
    
  // });
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string = '';

  constructor(
    private inicioService: InicioService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {   }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  submitForm() {
    const { salida, destino, fechaSalida } = this.form;

    this.inicioService.getFiltered(salida, destino, fechaSalida).subscribe(
      (data) => {
        console.log(data);
        if (data.success === true) {
          console.log(data.success, 'data.success');
          data.roles = data.usuario.role;
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.router.navigate(['admin']);
          
          
          console.log(this.roles, 'this.roles');
        } else {
          this.errorMessage = data.msg;
          this.isLoginFailed = true;
        }
      },
      (err) => {
        //console.log(err);
        this.errorMessage = err.msg;
        this.isLoginFailed = true;
      }
    );
  }
  

}
