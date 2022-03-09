import { MultiFilterSearch } from './../../models/interfaces/MultiFilter-Search';
import { MultiSelect } from 'src/app/models/interfaces/Multi-Select';
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
  RespuestaPaginacionAPI: Paginacion = new Paginacion();
  BuscarPagina = new BuscarPagina();
  Columnas: object[] = [{
    header: "Fecha Inicio",
    row: {
      name: "fecha_inicio",
      type: 'date'
    }
  }, {
    header: "Fecha Estimada",
    row: {
      name: "fecha_estimada",
      type: 'date'
    }
  }, {
    header: "Localidad",
    row: {
      name: "localidad",
      type: "string",
    }
  }, {
    header: "Responsable",
    row: {
      name: "responsable",
      type: "string"
    }
  }, {
    header: "Status",
    row: {
      name: "status",
      type: "bool"
    }
  }, {
    header: "Opciones",
    row: {
      name: "Opciones",
      type: "option"
    }
  }];
  Spinner: boolean = false;
  CamposMultiFiltro: MultiSelect[] = [];
  TotalRegistros = 0;
  TotalPaginas = 0;
  ResponsableForm = new FormGroup({
    nombre: new FormControl('Juan marco', Validators.required),
    correo: new FormControl('juan@marco.com'),
    telefono: new FormControl('042423-21312')
  });

  constructor(private proyectoService: ProyectosService) { }

  ngOnInit(): void {
    this.Spinner = true;
    this.BuscarDataAsincrona();
    this.Spinner = false;
    if (this.Columnas.length > 0) {
      this.CamposMultiFiltro = this.CamposParaFiltar();
    }
  }


  /* 
    Metodos HTTP
  */
  BuscarDataAsincrona = async () => {
    this.BuscarPagina.cantidadRegistrosPorPagina = 6;
    const espera = await this.proyectoService.ListarProyectos(this.BuscarPagina).then(
      (resp: Paginacion) => {
        this.asigar(resp.totalPaginas, resp.totalRegistros, resp.pagina);
        this.RespuestaPaginacionAPI = resp;
      },
      async (e) => {
        console.log(e)
      }
    )
  }

  onBuscar($event: MultiFilterSearch) {
    if ($event != null || $event != undefined) {
      /*      this.proyectoService.($event).subscribe(
             (resp:any)=>{
               console.log(resp)
             },
             (e) =>{
               console.log(e);
             }
           ) */
    }
  }

  CamposParaFiltar(): MultiSelect[] {
    return this.Columnas.map((obj) => {
      let MultiSelect: MultiSelect = {
        nombre: obj['header'],
        nombreTabla: obj['row']['name']
      }
      return MultiSelect;
    });
  }

  OnCambiodePagina= async($event: number) => {
    let esperarPagina = await this.cambiarPagina($event);
    this.Spinner = true;
     let a = await this.BuscarDataAsincrona();
    this.Spinner = false;
  }

  cambiarPagina(page:number){
    this.BuscarPagina.pagina = page;
  }

  asigar(tp: number, tr: number, p: number) {
    this.TotalPaginas = tp;
    this.TotalRegistros = tr;
    this.BuscarPagina.pagina = p;
  }



}
