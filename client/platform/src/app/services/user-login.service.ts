import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
const AUTH_API = `${environment.apiUrl}/usuario/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor(private http: HttpClient) { }
  login(usuario: string, contrasennia: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        usuario,
        contrasennia,
      },
      httpOptions
    );
  }
}
