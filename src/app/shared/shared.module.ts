import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes de SHARED
import { MenunavegacionComponent } from './menunavegacion/menunavegacion.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';



@NgModule({
  declarations: [
    MenunavegacionComponent,
    BreadcrumbsComponent,
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MenunavegacionComponent,
    BreadcrumbsComponent
  ]
})
export class SharedModule { }
