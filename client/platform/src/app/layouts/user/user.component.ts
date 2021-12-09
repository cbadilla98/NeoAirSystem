import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  usuario="Entrar";
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string = '';
  constructor(
    private tokenStorage: TokenStorageService,
    private router:Router,
  ) {
    
   }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.usuario=this.tokenStorage.getUser().name;
    }
  }
  logout(): void {
    this.isLoggedIn = false;
    this.tokenStorage.removeUser();
    this.router.navigate(['login'])
  }

}
