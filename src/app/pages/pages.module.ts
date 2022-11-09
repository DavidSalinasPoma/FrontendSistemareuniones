import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Formularios reactivos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes de PAGES
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ReunionesComponent } from './reuniones/reuniones.component';

// Modulo personalizado SHARED
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

// Editor de texto de angular
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ReunionesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  exports: [
    PagesComponent,
    HomeComponent,
    ReunionesComponent
  ]
})
export class PagesModule { }
