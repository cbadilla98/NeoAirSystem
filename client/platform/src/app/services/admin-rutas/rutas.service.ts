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
    //   addComment(postId: string, comment: Comment): Observable<any> {
    //     return this.http.post(`${BLOG_API_ENDPOINT}/${postId}/comment`, comment);
    //   }
    //   deleteComment(postId: string, commentId: any): Observable<any> {
    //     return this.http.delete(
    //       `${BLOG_API_ENDPOINT}/${postId}/comments/${commentId}`
    //     );
    //   }

}