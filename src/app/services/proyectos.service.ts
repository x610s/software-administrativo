import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment } from './../../environments/environment';
import { Paginacion, BuscarPagina } from './../models/generales.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private http:HttpClient) { }

   //Listar
   BuscarProyectos = async (bp: BuscarPagina):Promise<any>=>
   this.http.post<Paginacion>(`${environment.api_url}/Proyecto`,bp).toPromise();
 
   //Crear
   CrearProyecto = (form: FormGroup):Observable<Paginacion>=>
   this.http.post<Paginacion>(`${environment.api_url}/Proyecto/Add`,form);
  
}
