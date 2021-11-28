import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const AVIONES_API_ENDPOINT = `${environment.apiUrl}/aviones`;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class AvionesService {
    constructor(private http: HttpClient) {
    }

    get(): Observable<any> {
        return this.http.get(AVIONES_API_ENDPOINT, httpOptions);
    }

    getById(id: string): Observable<any> {
        return this.http.get(`${AVIONES_API_ENDPOINT}/${id}`);
    }

    deleteAvion(id: string): Observable<any> {
        return this.http.delete(
          `${AVIONES_API_ENDPOINT}/${id}/`
        );
      }

      edit(id: string, post: any): Observable<any> {
        return this.http.put(`${AVIONES_API_ENDPOINT}/${id}`, post);
      }

      create(post: any): Observable<any> {
        return this.http.post(AVIONES_API_ENDPOINT, post);
    }

}
