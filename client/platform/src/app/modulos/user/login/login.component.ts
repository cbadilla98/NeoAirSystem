
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLoginService } from 'src/app/services/user-login.service';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  postForm = new FormGroup({
    
    usuario: new FormControl('', Validators.required),
    contrasennia: new FormControl('', Validators.required),
    
  });
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string = '';

  constructor(
    private loginService: UserLoginService,
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
   

    this.loginService.login(this.postForm.get("usuario")?.value, this.postForm.get("contrasennia")?.value).subscribe(
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
          if (this.roles == '618b1fb6e2fc485078acfdbd') {
            this.router.navigate(['inicio']);
          }
          if (this.roles === 'admin') {
            this.router.navigate(['/dashboard/profile']);
          }
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


