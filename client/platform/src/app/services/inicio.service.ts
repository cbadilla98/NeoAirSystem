import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
const AUTH_API = `${environment.apiUrl}/inicio/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor(private https: HttpClient) { }
  getFiltered(salida: string, destino: string, fechaSalida:Date): Observable<any> {
    return this.https.post(
      AUTH_API + 'busqueda',
      {
        salida,
        destino,
        fechaSalida
      },
      httpOptions
    );
  }
}
