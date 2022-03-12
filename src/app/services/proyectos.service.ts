import { Proyecto } from './../models/proyecto.model';
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

   //CambiarEstado
    CambiarEstado = (ProyectoId:number,Status:number):Observable<Proyecto>=>{
      const obj = {Status}
      return this.http.put<Proyecto>(`${environment.api_url}/Proyecto/CambiarEstado/${ProyectoId}`,obj);
    }
   
    //Eliminar
    Eliminar = (ProyectoId:number):Observable<number>=>
    this.http.delete<number>(`${environment.api_url}/Proyecto/Eliminar/${ProyectoId}`);
/*
    //Ver Descripcion
    VerDescripcion = (ProyectoId:number):Observable<Paginacion>=>
    this.http.get<Paginacion>(`${environment.api_url}/Proyecto/Descripcion/${ProyectoId}`); */
  
}
