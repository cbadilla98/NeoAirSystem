import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const CLASES_API_ENDPOINT = `${environment.apiUrl}/clases`;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class ClasesService {
    constructor(private http: HttpClient) {
    }

    get(): Observable<any> {
        return this.http.get(CLASES_API_ENDPOINT, httpOptions);
    }

    getById(id: string): Observable<any> {
        return this.http.get(`${CLASES_API_ENDPOINT}/${id}`);
    }

    delete(id: string): Observable<any> {
        return this.http.delete(
          `${CLASES_API_ENDPOINT}/${id}/`
        );
      }

      edit(id: string, post: any): Observable<any> {
        return this.http.put(`${CLASES_API_ENDPOINT}/${id}`, post);
      }

      create(post: any): Observable<any> {
        return this.http.post(CLASES_API_ENDPOINT, post);
    }

}
