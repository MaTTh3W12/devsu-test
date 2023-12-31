import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { CrearComponent } from './pages/crear/crear.component';
import { HeaderComponent } from './pages/header/header.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: 'listado',
        component: ListadoComponent
      },
      {
        path: 'crear',
        component: CrearComponent
      },
      {
        path: 'editar/:id',
        component: CrearComponent
      },
      {
        path: '**',
        redirectTo: 'listado'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
