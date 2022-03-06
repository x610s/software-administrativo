import { SnackbarComponent } from './../components/snackbar/snackbar.component';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom'
  constructor( private _snackBar: MatSnackBar) { }


  MostrarSnackbar = ()=> {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['snack-bg']
    });
  }
}
