import { MaterialModule } from './angular-material/material/material.module';
import { MenuButtonsComponent } from './layout/menu-buttons/menu-buttons.component';
import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { SidenavContentComponent } from './layout/sidenav-content/sidenav-content.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { LocalidadesComponent } from './pages/localidades/localidades.component';
import { ResponsablesComponent } from './pages/responsables/responsables.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MenuButtonsComponent,
    SidenavComponent,
    SidenavContentComponent,
    ToolbarComponent,
    ProyectosComponent,
    LocalidadesComponent,
    ResponsablesComponent,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
