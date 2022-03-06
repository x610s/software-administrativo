import { MaterialModule } from './../angular-material/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { WrapperHeaderComponent } from './wrapper-header/wrapper-header.component';
import { SnackbarComponent } from './snackbar/snackbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    TableComponent,
    PaginatorComponent,
    WrapperHeaderComponent,
    SnackbarComponent

  ],
  exports: [
    TableComponent,
    WrapperHeaderComponent,
    PaginatorComponent,
    SnackbarComponent
  ]
})
export class ComponentsModule { }
