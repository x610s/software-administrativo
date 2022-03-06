import { MaterialService } from './../../services/material.service';
import { SnackbarComponent } from './../../components/snackbar/snackbar.component';
import { Paginacion } from './../../models/generales.model';
import { Responsable } from './../../models/responsable.model';
import { ResponsableService } from './../../services/responsable.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BuscarPagina } from 'src/app/models/generales.model';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-responsables',
  templateUrl: './responsables.component.html',
  styleUrls: ['./responsables.component.scss']
})
export class ResponsablesComponent implements OnInit {


  ListadoResponsables:Responsable[] = [];
  RespuestaPaginacionAPI:Paginacion = new Paginacion();
  Columnas: string[] = ["id","nombre","correo","telefono"];
  ResponsableForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
    correo: new FormControl(''),
    telefono: new FormControl('')
  });

  constructor(public responsableService:ResponsableService,
    private material:MaterialService) { }

  ngOnInit(): void {
    this.BuscarResponsables();
  }


  //Metodos Http
  BuscarResponsables(){
    console.log(this.RespuestaPaginacionAPI.pagina);
    this.responsableService.ListarResponsables
    (new BuscarPagina(this.RespuestaPaginacionAPI.pagina,6)).subscribe(
      (resp:Paginacion)=>{
        this.RespuestaPaginacionAPI = resp;
      },
      (e)=>{
        console.log(e)
      }
    )
  }
 


  //Metodos de Formulario
  OnCrear(){
    if(this.ResponsableForm.valid){
      this.responsableService.CrearResponsable(this.ResponsableForm.value).subscribe(
        (resp:any)=>{
          this.material.MostrarSnackbar();
          this.ResponsableForm.reset();
        },
        (e)=>{
          console.log(e)
        }
      )
    }else{
      console.log('no valido');
      
    }
  }

  OnCambiodePagina($event:number){
    this.RespuestaPaginacionAPI.pagina = $event;
    this.BuscarResponsables();
  }


}
