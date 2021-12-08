import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const BLOG_API_ENDPOINT = `${environment.apiUrl}/tiquetes`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TiqueteService {
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(BLOG_API_ENDPOINT, httpOptions);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${BLOG_API_ENDPOINT}/${id}`);
  }
  
  addTiquete(postId: string, comment: Comment): Observable<any> {
    return this.http.post(`${BLOG_API_ENDPOINT}/${postId}/comment`, comment);
}
deleteTiquete(id: string): Observable<any> {
  return this.http.delete(
    `${BLOG_API_ENDPOINT}/${id}/`
  );
}
create(post: any): Observable<any> {
  return this.http.post(BLOG_API_ENDPOINT, post);
}

edit(id: string, post: any): Observable<any> {
  return this.http.put(`${BLOG_API_ENDPOINT}/${id}`, post);
}

}