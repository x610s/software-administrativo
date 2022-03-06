import { BuscarPagina, Paginacion } from './../models/generales.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

constructor(private http:HttpClient) { }

  ListarResponsables = (bp: BuscarPagina):Observable<Paginacion>=>
  this.http.post<Paginacion>(`${environment.api_url}/Responsable`,bp);
  
 

}
