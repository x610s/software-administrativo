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
  CamposMultiFiltro:MultiSelect[] = [];
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
    this.CamposParaFiltar()
    this.Spinner= true;
   setTimeout(() => {
    this.BuscarResponsables();
    this.Spinner= false;
   }, 1);

   if(this.Columnas.length>0){
     this.CamposMultiFiltro = this.CamposParaFiltar();
   }
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

  onBuscar($event:MultiFilterSearch){
    if($event !=null || $event != undefined){
        this.responsableService.BuscarResponsables($event).subscribe(
          (resp:any)=>{
            console.log(resp)
          },
          (e) =>{
            console.log(e);
          }
        )


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
