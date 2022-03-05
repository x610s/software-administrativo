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

//material
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { SidenavContentComponent } from './layout/sidenav-content/sidenav-content.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MenuButtonsComponent,
    SidenavComponent,
    SidenavContentComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    MatSidenavModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
