import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const OFERTAS_API_ENDPOINT = `${environment.apiUrl}/ofertas`;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class OfertasService {
    constructor(private http: HttpClient) {
    }

    get(): Observable<any> {
        return this.http.get(OFERTAS_API_ENDPOINT, httpOptions);
    }

    getById(id: string): Observable<any> {
        return this.http.get(`${OFERTAS_API_ENDPOINT}/${id}`);
    }

    create(post: any): Observable<any> {
        return this.http.post(OFERTAS_API_ENDPOINT, post);
    }
    deleteOferta(id: string): Observable<any> {
        return this.http.delete(
            `${OFERTAS_API_ENDPOINT}/${id}/`
        );
    }
    updateOferta(id: string, post: any): Observable<any> {
        return this.http.put(`${OFERTAS_API_ENDPOINT}/${id}`, post);
    }
}
