import { ResponsablesComponent } from './pages/responsables/responsables.component';
import { LocalidadesComponent } from './pages/localidades/localidades.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'',component:LayoutComponent,
  children:[
    {path:'proyectos',component: ProyectosComponent},
    {path:'localidades',component: LocalidadesComponent},
    {path:'responsables',component: ResponsablesComponent},
  ]},
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
