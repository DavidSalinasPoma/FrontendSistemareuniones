import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



// Componentes de PAGES
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';

// Modulo personalizado SHARED
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    PagesComponent,
    HomeComponent
  ]
})
export class PagesModule { }
