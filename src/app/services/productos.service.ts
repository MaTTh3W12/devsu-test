import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Productos } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private baseUrl = environment.baseUrl

  private option = {
    headers: new HttpHeaders().set( 'authorId', '120')
  };

  constructor( private http: HttpClient) { }

  getProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.baseUrl}`, this.option);
  }

  getProductosPorId(id: string): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.baseUrl}?id=${id}`, this.option);
  }

  agregarProductos (producto: Productos): Observable<Productos> {
    return this.http.post<Productos>(`${this.baseUrl}`, producto , this.option );
  }

  editarProducto(producto: Productos): Observable<Productos> {
    return this.http.put<Productos>(`${this.baseUrl}`, producto, this.option);
  }

  borrarProducto (id: string):Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}?id=${id}`, this.option);
  }
}
