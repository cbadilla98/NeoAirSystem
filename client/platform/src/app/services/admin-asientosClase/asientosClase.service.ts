import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const ASIENTOSCLASE_API_ENDPOINT = `${environment.apiUrl}/asientosClase`;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class AsientosClaseService {
    constructor(private http: HttpClient) {
    }

    get(): Observable<any> {
        return this.http.get(ASIENTOSCLASE_API_ENDPOINT, httpOptions);
    }

    getById(id: string): Observable<any> {
        return this.http.get(`${ASIENTOSCLASE_API_ENDPOINT}/${id}`);
    }

    delete(id: string): Observable<any> {
        return this.http.delete(
          `${ASIENTOSCLASE_API_ENDPOINT}/${id}/`
        );
      }

      edit(id: string, post: any): Observable<any> {
        return this.http.put(`${ASIENTOSCLASE_API_ENDPOINT}/${id}`, post);
      }

      create(post: any): Observable<any> {
        return this.http.post(ASIENTOSCLASE_API_ENDPOINT, post);
    }

}
