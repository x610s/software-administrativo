import { ProyectosService } from './../../services/proyectos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BuscarPagina, Paginacion } from './../../models/generales.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {
  RespuestaPaginacionAPI:Paginacion = new Paginacion();
  BuscarPagina= new BuscarPagina();
  Columnas: object[] = [{
    header:"Fecha Inicio",
    row:{
      name:"fecha_inicio",
      type: 'date'
    }
  },{
    header:"Fecha Estimada",
    row:{
      name:"fecha_estimada",
      type: 'date'
    }
  },{
    header:"Localidad",
    row:{
      name:"localidad",
      type:"string",
    } 
  },{
    header:"Responsable",
    row:{
      name:"responsable",
      type:"string"
    }
  },{
    header:"Status",
    row:{
      name:"status",
      type:"bool"
    }
  },{
    header:"Opciones",
    row:{
      name:"Opciones",
      type:"option"
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
  
  constructor(private proyectoService: ProyectosService) { }

  ngOnInit(): void {
    this.BuscarProyectos();
  }


  async BuscarProyectos(){
     this.BuscarPagina.cantidadRegistrosPorPagina = 6;
      this.proyectoService.ListarProyectos(this.BuscarPagina).subscribe(
           async(resp:Paginacion)=>{
             console.log("buscando")
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

   OnCambiodePagina($event:number){
    this.RespuestaPaginacionAPI.pagina = $event;
    this.BuscarPagina.pagina = $event;
    this.BuscarProyectos();
  }

  async onRefrescarTable(){
     this.MostrarSpinner();
     setTimeout(async() => {
     this.BuscarProyectos();
     this.AnularSpinner();
    }, 100);
  }

  asigar(tp:number,tr:number,p:number){
    this.TotalPaginas = tp;
    this.TotalRegistros =tr;
    this.BuscarPagina.pagina = p;
   }

   AnularSpinner(){
    this.Spinner = false;
  }
  MostrarSpinner(){
     this.Spinner = true;
  }

}
