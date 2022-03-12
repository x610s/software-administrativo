import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../angular-material/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { WrapperHeaderComponent } from './wrapper-header/wrapper-header.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { ProyectosDialogComponent } from './modals/proyectos-dialog/proyectos-dialog.component';
import { ResponsablesDialogComponent } from './modals/responsables-dialog/responsables-dialog.component';
import { TableOptionMenuComponent } from './table/table-option-menu/table-option-menu.component';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { ProyectosTableOptionComponent } from './table/table-option-menu/proyectos-table-option/proyectos-table-option.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TableComponent,
    PaginatorComponent,
    WrapperHeaderComponent,
    SnackbarComponent,
    ProyectosDialogComponent,
    ResponsablesDialogComponent,
    TableOptionMenuComponent,
    DateFilterComponent,
    ProyectosTableOptionComponent,

  ],
  exports: [
    TableComponent,
    PaginatorComponent,
    WrapperHeaderComponent,
    SnackbarComponent,
    ProyectosDialogComponent,
    ResponsablesDialogComponent,
    TableOptionMenuComponent
  ]
})
export class ComponentsModule { }
