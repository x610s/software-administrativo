import { DateFilter } from './../../models/interfaces/DateFilter';
import { TableColumn } from './../../models/interfaces/TableColumn';
import { MaterialService } from './../../services/material.service';
import { MultiFilterSearch } from './../../models/interfaces/MultiFilter-Search';
import { MultiSelect } from 'src/app/models/interfaces/Multi-Select';
import { ProyectosService } from './../../services/proyectos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BuscarPagina, Paginacion } from './../../models/generales.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {
  RespuestaPaginacionAPI: Paginacion = new Paginacion();
  BuscarPagina = new BuscarPagina(1, 6);
  Columnas: TableColumn[] = [{
    header: "Fecha Inicio",
      row: {
        name: "fecha_inicio",
        type: 'date',
       canFilterBy: true
      }
    },{
    header: "Fecha Estimada",
    row: {
      name: "fecha_estimada",
      type: 'date',
      canFilterBy: true
    }
  }, {
    header: "Localidad",
    queryString: 'localidad.nombre',
    row: {
      name: "localidad",
      type: "string",
      canFilterBy: true,
    },
  },{
    header: "Responsable",
    queryString: 'responsables.nombre',
    row: {
      name: "responsable",
      type: "string",
      canFilterBy: true,
    },
  }, {
    header: "Status",
    row: {
      name: "status",
      type: "bool",
    }
  }, {
    header: "Opciones",
    row: {
      name: "Opciones",
      type: "option",
    }
  }];

  Spinner: boolean = false;
  CamposMultiFiltro: MultiSelect[] = [];
  CamposFechaFiltro: MultiSelect[] = [];
  TotalRegistros = 0;
  TotalPaginas = 0;
  ResponsableForm = new FormGroup({
    nombre: new FormControl('Juan marco', Validators.required),
    correo: new FormControl('juan@marco.com'),
    telefono: new FormControl('042423-21312')
  });

  constructor(private proyectoService: ProyectosService,
    private material: MaterialService) { }

  ngOnInit(): void {
    this.Spinner = true;
    this.BuscarDataAsincrona();
    this.Spinner = false;
    if (this.Columnas.length > 0) {
      this.CamposParaFiltar();
    }
  }


  /* 
    Metodos HTTP
  */
  BuscarDataAsincrona = async () => {
    const espera = await this.proyectoService.BuscarProyectos(this.BuscarPagina).then(
      async  (resp: Paginacion) => {
        console.log(resp);
        const esperarA = await  this.asignar(resp.totalPaginas, resp.totalRegistros, resp.pagina);
        this.RespuestaPaginacionAPI = resp;
      },
      async (e) => {
        console.log(e)
      }
    )
  }

  onBuscar($event: MultiFilterSearch) {
    if ($event != null || $event != undefined) {
       this.Spinner = true;
      this.BuscarPagina.filtroTexto = $event;
      this.BuscarPagina.pagina = 1;
       this.proyectoService.BuscarProyectos(this.BuscarPagina).then(
        async (resp: Paginacion) => {
          const esperarA = await this.asignar(resp.totalPaginas, resp.totalRegistros, resp.pagina, resp);
          this.Spinner = false;
        },
        (e) => {
          this.Spinner = false;
        }
      )  
    }
  }

  //Eventos u Estilos

  CamposParaFiltar() {
    this.Columnas.map((obj) => {
      if (obj['row']['type'] != 'date' && obj['row']['canFilterBy'] == true) {
        this.CamposMultiFiltro.push({
          nombre: obj['header'],
          nombreTabla: obj['row']['name'],
          queryString: obj['queryString']? obj['queryString'] : null
        });
      } else if(obj['row']['type'] == 'date' && obj['row']['canFilterBy'] == true){
        this.CamposFechaFiltro.push({
          nombre: obj['header'],
          nombreTabla: obj['row']['name'],
          queryString: obj['queryString'] ? obj['queryString'] : null
        });
      }
    });
  }


  OnCambiodePagina = async ($event: number) => {
    let esperarPagina = await this.cambiarPagina($event);
    this.Spinner = true;
    let a = await this.BuscarDataAsincrona();
    this.Spinner = false;
  }


  cambiarPagina(page: number) {
    this.BuscarPagina.pagina = page;
  }

  asignar(tp: number, tr: number, p: number, resp?: object | any) {
    this.TotalPaginas = tp;
    this.TotalRegistros = tr;
    this.BuscarPagina.pagina = p;
    if (resp != null || resp != undefined) {
      this.RespuestaPaginacionAPI = resp
    }
  }

  LimpiarBusqueda = async ($event: boolean = true) => {
    this.BuscarPagina.filtroTexto = {
      campos: [],
      termino: ""
    }
    this.Spinner = true;
    let a = await this.BuscarDataAsincrona();
    this.Spinner = false;
  }

  onFiltroFecha= async ($event:DateFilter[]) =>{
      this.BuscarPagina.filtroFechas = $event;
      this.Spinner = true;
      let a = await this.BuscarDataAsincrona();
      this.Spinner = false; 
  }

}
