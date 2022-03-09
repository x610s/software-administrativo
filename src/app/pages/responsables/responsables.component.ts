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
    this.BuscarDataAsincrona();
    this.Spinner= false;
   if(this.Columnas.length>0){
     this.CamposMultiFiltro = this.CamposParaFiltar();
   } 
  }

   //Metodos Http
  BuscarDataAsincrona = async() => {
    this.BuscarPagina.cantidadRegistrosPorPagina = 6;
    const espera = await this.responsableService.ListarResponsables(this.BuscarPagina).then(
        (resp:Paginacion)=>{
         this.asigar(resp.totalPaginas,resp.totalRegistros,resp.pagina);
          this.RespuestaPaginacionAPI = resp;
      }
    ).catch((e)=>{
      console.log(e);
    })
  }

   OnCrear():void{
   /*  if(this.ResponsableForm.valid){
      this.Spinner = true;
      this.responsableService.CrearResponsable(this.ResponsableForm.value).subscribe(
         async (resp:Paginacion)=>{
          this.material.MostrarSnackbar();
          await this.AgregarRegistroPaginacion();
          this.ResponsableForm.reset();
            this.BuscarResponsables();
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
    }    */
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

  OnCambiodePagina= async($event:number)=>{
   let esperarPagina = await this.cambiarPagina($event);
    this.Spinner = true;
     let a = await this.BuscarDataAsincrona();
    this.Spinner = false;
  }

  asigar(tp:number,tr:number,p:number){
    this.TotalPaginas = tp;
    this.TotalRegistros =tr;
    this.BuscarPagina.pagina = p;
  }

  cambiarPagina(page:number){
    this.BuscarPagina.pagina = page;
  }

  AgregarRegistroPaginacion(){
    this.TotalRegistros += 1;
    this.BuscarPagina.pagina =1;
    this.TotalPaginas = Math.ceil(this.TotalRegistros/this.BuscarPagina.cantidadRegistrosPorPagina);
  }
}
