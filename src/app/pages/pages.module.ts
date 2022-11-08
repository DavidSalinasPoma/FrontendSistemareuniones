import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Formularios reactivos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes de PAGES
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';

// Modulo personalizado SHARED
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PagesComponent,
    HomeComponent
  ]
})
export class PagesModule { }
