import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes de SHARED
import { MenunavegacionComponent } from './menunavegacion/menunavegacion.component';



@NgModule({
  declarations: [
    MenunavegacionComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MenunavegacionComponent
  ]
})
export class SharedModule { }
