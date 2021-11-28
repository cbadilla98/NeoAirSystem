import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const HORARIOS_API_ENDPOINT = `${environment.apiUrl}/horarios`;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class HorarioService {
    constructor(private http: HttpClient) {
    }

    get(): Observable<any> {
        return this.http.get(HORARIOS_API_ENDPOINT, httpOptions);
    }

    getById(id: string): Observable<any> {
        return this.http.get(`${HORARIOS_API_ENDPOINT}/${id}`);
    }

    create(post: any): Observable<any> {
        return this.http.post(HORARIOS_API_ENDPOINT, post);
    }
    deleteHorario(id: string): Observable<any> {
        return this.http.delete(
            `${HORARIOS_API_ENDPOINT}/${id}/`
        );
    }
    updateHorario(id: string, post: any): Observable<any> {
        return this.http.put(`${HORARIOS_API_ENDPOINT}/${id}`, post);
    }
}
