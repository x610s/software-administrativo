import { MultiFilterSearch } from './../models/interfaces/MultiFilter-Search';
import { Responsable } from './../models/responsable.model';
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
   ListarResponsables = async(bp: BuscarPagina):Promise<any>=>{
     return this.http.post<Paginacion>(`${environment.api_url}/Responsable`,bp).toPromise();
    }

  //Crear
  CrearResponsable = (form: FormGroup):Observable<Paginacion>=>
  this.http.post<Paginacion>(`${environment.api_url}/Responsable/Add`,form);

  //Buscar
  BuscarResponsables = (multiFiltro: MultiFilterSearch):Observable<any>=>
  this.http.post<any>(`${environment.api_url}/Responsable/Search`,multiFiltro);
 

}
