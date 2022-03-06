import { FormGroup } from '@angular/forms';
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


  //Listar
  ListarResponsables = (bp: BuscarPagina):Observable<Paginacion>=>
  this.http.post<Paginacion>(`${environment.api_url}/Responsable`,bp);

  //Crear
  CrearResponsable = (form: FormGroup):Observable<any>=>
  this.http.post<any>(`${environment.api_url}/Responsable/Add`,form);
  
 

}
