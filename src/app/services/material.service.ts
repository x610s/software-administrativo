import { SnackbarComponent } from './../components/snackbar/snackbar.component';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Injectable,  } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  PaginatorData:BehaviorSubject<Object> = new BehaviorSubject<Object>({
    TotalRegistros:0,
    TotalPaginas:0,
  });

  constructor( private _snackBar: MatSnackBar) { }

  MostrarSnackbar = ()=> {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['snack-bg']
    });
  }

  SetPaginatorData(tr:number,tp:number){
    this.PaginatorData.next({
      TotalRegistros:tr,
      TotalPaginas:tp
    })
  }
}
