/**
 * Importaciones necesarias de:
 * NgModule
 * Router
 * Componentes
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';

/**
 * Declaración e inicialización de la constante routes
 */
const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'empleados', component: EmpleadosComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
