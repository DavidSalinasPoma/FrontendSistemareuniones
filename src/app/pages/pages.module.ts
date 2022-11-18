import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Formularios reactivos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes de PAGES
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ReunionesComponent } from './reuniones/reuniones.component';
import { PorfechaComponent } from './reportes/porfecha/porfecha.component';
import { PormotivoComponent } from './reportes/pormotivo/pormotivo.component';
import { RangofechaComponent } from './reportes/rangofecha/rangofecha.component';
import { EstadoreunionComponent } from './reportes/estadoreunion/estadoreunion.component';

// Modulo personalizado SHARED
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

// Editor de texto de angular
import { QuillModule } from 'ngx-quill';

// Notificaciones Toastr
import { ToastrModule } from 'ngx-toastr';

// Para imrpimir en PDF
import { NgxPrintModule } from 'ngx-print';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ReunionesComponent,
    PorfechaComponent,
    PormotivoComponent,
    RangofechaComponent,
    EstadoreunionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    NgxPrintModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added
  ],
  exports: [
    PagesComponent,
    HomeComponent,
    ReunionesComponent
  ]
})
export class PagesModule { }
