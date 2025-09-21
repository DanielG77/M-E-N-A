import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Concierto } from '../../models/concierto.model';

@Injectable({
  providedIn: 'root'
})
export class ConciertoService {
  private baseUrl = 'http://localhost:3000/api/conciertos';

  constructor(private http: HttpClient) {}

  list(): Observable<Concierto[]> {
  return this.http.get<any>(this.baseUrl).pipe(
    map(res => res.data.map((item: any) => ({
      _id: item._id,
      titulo: item.titulo,
      fecha: item.fecha,
      lugar: item.lugar,
      precio: item.precio,
      descripcion: item.descripcion,
      artista: item.artista,
      genero: item.genero,
      imagenUrl: item.imagenUrl
    })))
  );
}


  get(id: string): Observable<Concierto> {
    return this.http.get<Concierto>(`${this.baseUrl}/${id}`);
  }

  create(concierto: Concierto): Observable<Concierto> {
    return this.http.post<Concierto>(this.baseUrl, concierto);
  }

  update(id: string, concierto: Concierto): Observable<Concierto> {
    return this.http.put<Concierto>(`${this.baseUrl}/${id}`, concierto);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
