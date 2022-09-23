import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Moment } from '../Moment';
import { environment } from 'src/environments/environment';
import { Response } from '../Response';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/moments`


  constructor(private http: HttpClient) { }

  //recebe todos os momentos, por isso um array de momento
  getMoments(): Observable<Response<Moment[]>>{
      return this.http.get<Response<Moment[]>>(this.apiUrl)
  }
  //recebe apenas 1 momento com parametro id portanto não tem array
  getMoment(id: number): Observable<Response<Moment>>{
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Response<Moment>>(url)
  }

  createMoment(formData: FormData): Observable<FormData>{

    return this.http.post<FormData>(this.apiUrl, formData)

  }
  
  removerMomento(id: number){
    const url = `${this.apiUrl}/${id}`
    return this.http.delete(url)
  }

  updateMoment(id: Number, formData: FormData): Observable<FormData>{
    const url = `${this.apiUrl}/${id}`
    return this.http.put<FormData>(url, formData)
  }
}
