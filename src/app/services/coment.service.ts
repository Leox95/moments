import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { Coment } from '../Coment';
import { Response } from '../Response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComentService {
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/moments`

  constructor(private http: HttpClient) { }

  createComment(data: Coment): Observable<Response<Coment>>{
    const url = `${this.apiUrl}/${data.momentId}/comments`
    return this.http.post<Response<Coment>>(url, data)
  }
}
