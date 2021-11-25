import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const RUTAS_API_ENDPOINT = `${environment.apiUrl}/rutas`;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class RutasService {
    constructor(private http: HttpClient) {
    }

    get(): Observable<any> {
        return this.http.get(RUTAS_API_ENDPOINT, httpOptions);
    }

    getById(id: string): Observable<any> {
        return this.http.get(`${RUTAS_API_ENDPOINT}/${id}`);
    }
    
    create(post: any): Observable<any> {
        return this.http.post(RUTAS_API_ENDPOINT, post);
      }

}
