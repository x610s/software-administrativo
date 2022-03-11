import { MultiFilterSearch } from './../../models/interfaces/MultiFilter-Search';
import { MaterialService } from './../../services/material.service';
import { Paginacion } from './../../models/generales.model';
import { ResponsableService } from './../../services/responsable.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BuscarPagina } from 'src/app/models/generales.model';
import { MultiSelect } from 'src/app/models/interfaces/Multi-Select';

@Component({
  selector: 'app-responsables',
  templateUrl: './responsables.component.html',
  styleUrls: ['./responsables.component.scss']
})
export class ResponsablesComponent implements OnInit {


  RespuestaPaginacionAPI:Paginacion = new Paginacion();
  BuscarPagina= new BuscarPagina(1,6);
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
  CamposMultiFiltro:MultiSelect[] = [];
  TotalRegistros = 0;
  TotalPaginas = 0;
  ResponsableForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
    correo: new FormControl(''),
    telefono: new FormControl('')
  });

  constructor(public responsableService:ResponsableService,
    private material:MaterialService) { 
    }

  ngOnInit(): void {
    this.Spinner= true;
    this.BuscarDataAsincrona();
    this.Spinner= false;
   if(this.Columnas.length>0){
     this.CamposMultiFiltro = this.CamposParaFiltar();
   } 
  }

   //Metodos Http
  BuscarDataAsincrona = async() => {
    const espera = await this.responsableService.BuscarResponsables(this.BuscarPagina).then(
        (resp:Paginacion)=>{
          this.asignar(resp.totalPaginas,resp.totalRegistros,resp.pagina);
         this.RespuestaPaginacionAPI = resp;
      }
    ).catch((e)=>{
      console.log(e);
    })
  }

  
  onBuscar =($event:MultiFilterSearch) =>{
    if($event !=null || $event != undefined){
      this.Spinner = true;
      this.BuscarPagina.filtroTexto = $event;
      this.BuscarPagina.pagina = 1;
      this.responsableService.BuscarResponsables(this.BuscarPagina).then(
         async (resp:Paginacion)=>{
           console.log(resp);
           const esperarA = await this.asignar(resp.totalPaginas,resp.totalRegistros,resp.pagina,resp);
           this.Spinner = false;  
          },
          (e) =>{
             this.Spinner = false; 
          }
        )   
    } 
  }

   OnCrear(){
    if(this.ResponsableForm.valid){
      this.Spinner = true;
      this.responsableService.CrearResponsable(this.ResponsableForm.value).subscribe(
         async (resp:Paginacion)=>{
          this.material.MostrarSnackbar();
          this.ResponsableForm.reset();
          const esperar = await this.BuscarDataAsincrona(); 
         this.Spinner=false;
        },
        async (e)=>{
          this.Spinner = false
          console.log(e)
        }
      ) 
    }else{
      console.log('no valido');
    }    
  }

  
  //Eventos u Estilos
  CamposParaFiltar():MultiSelect[]{
     return this.Columnas.map((obj)=>{
     let MultiSelect: MultiSelect = {
          nombre:obj['header'],
          nombreTabla: obj['row']['name']
      }
      return MultiSelect;
    });
  }

  OnCambiodePagina= async($event:number)=>{
   let esperarPagina = await this.cambiarPagina($event);
    this.Spinner = true;
     let a = await this.BuscarDataAsincrona();
    this.Spinner = false;
  }

  asignar(tp:number,tr:number,p:number,resp?:object|any){
    this.TotalPaginas = tp;
    this.TotalRegistros =tr;
    this.BuscarPagina.pagina = p;
    if(resp!=null || resp !=undefined){
      this.RespuestaPaginacionAPI = resp
    }
  }

  cambiarPagina(page:number){
    this.BuscarPagina.pagina = page;
  }

  LimpiarBusqueda = async($event: boolean = true)=>{
    this.BuscarPagina.filtroTexto = {
      campos:[],
      termino:""
    }
    this.Spinner = true;
    let a = await this.BuscarDataAsincrona();
    this.Spinner = false;
  }
}
