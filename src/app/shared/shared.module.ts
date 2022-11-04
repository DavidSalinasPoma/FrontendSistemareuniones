import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes de SHARED
import { MenunavegacionComponent } from './menunavegacion/menunavegacion.component';



@NgModule({
  declarations: [
    MenunavegacionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenunavegacionComponent
  ]
})
export class SharedModule { }
