import { MaterialService } from './../../services/material.service';
import { Paginacion } from './../../models/generales.model';
import { ResponsableService } from './../../services/responsable.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BuscarPagina } from 'src/app/models/generales.model';

@Component({
  selector: 'app-responsables',
  templateUrl: './responsables.component.html',
  styleUrls: ['./responsables.component.scss']
})
export class ResponsablesComponent implements OnInit {


  RespuestaPaginacionAPI:Paginacion = new Paginacion();
  BuscarPagina= new BuscarPagina();
  Columnas: object[] = [{
    header:"Nombre",
    row:{
      name:"nombre",
      type:"string"
    }
  },{
    header:"Correo",
    row:{
      name:"correo",
      type:"string"
    }
  },{
    header:"Nro. Telefonico",
    row:{
      name:"telefono",
      type:"string"
    }
  }];
  Spinner: boolean = false;
  pagina = 1;
  TotalRegistros = 0;
  TotalPaginas = 0;
  ResponsableForm = new FormGroup({
    nombre: new FormControl('Juan marco',Validators.required),
    correo: new FormControl('juan@marco.com'),
    telefono: new FormControl('042423-21312')
  });

  constructor(public responsableService:ResponsableService,
    private material:MaterialService) { 
    }

  ngOnInit(): void {
    this.Spinner= true;
   setTimeout(() => {
    this.BuscarResponsables();
    this.Spinner= false;
   }, 1);
  }


  //Metodos Http
  async BuscarResponsables(){
   this.BuscarPagina.cantidadRegistrosPorPagina = 6;
      this.responsableService.ListarResponsables(this.BuscarPagina).subscribe(
          async(resp:Paginacion)=>{
          await this.asigar(resp.totalPaginas,resp.totalRegistros,resp.pagina);
          this.RespuestaPaginacionAPI = resp;
          this.TotalRegistros = resp.totalRegistros;
          this.TotalPaginas = resp.totalPaginas;
        },
       async (e)=>{
          console.log(e)
        }
      )
    }
 

  //Metodos de Formulario
   OnCrear():void{
    if(this.ResponsableForm.valid){
      this.Spinner = true;
      this.responsableService.CrearResponsable(this.ResponsableForm.value).subscribe(
         async (resp:Paginacion)=>{
          this.material.MostrarSnackbar();
          await this.AgregarRegistroPaginacion();
          this.ResponsableForm.reset();
          await  this.BuscarResponsables();
          await this.AnularSpinner();
        },
        async (e)=>{
          this.Spinner = false
          console.log(e)
          await this.AnularSpinner();
        }
      ) 
    }else{
      console.log('no valido');
    }   

  }

  OnCambiodePagina($event:number){
    this.RespuestaPaginacionAPI.pagina = $event;
    this.BuscarPagina.pagina = $event;
    this.BuscarResponsables();
  }

  asigar(tp:number,tr:number,p:number){
    this.TotalPaginas = tp;
    this.TotalRegistros =tr;
    this.BuscarPagina.pagina = p;
  }

  AnularSpinner(){
    this.Spinner = false;
  }

  AgregarRegistroPaginacion(){
    this.TotalRegistros += 1;
    this.BuscarPagina.pagina =1;
    this.TotalPaginas = Math.ceil(this.TotalRegistros/this.BuscarPagina.cantidadRegistrosPorPagina);
  }
}
