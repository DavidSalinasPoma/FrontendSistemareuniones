import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Componetes de PAGES
import { HomeComponent } from './home/home.component';
import { ReunionesComponent } from './reuniones/reuniones.component';
import { PorfechaComponent } from './reportes/porfecha/porfecha.component';
import { PormotivoComponent } from './reportes/pormotivo/pormotivo.component';
import { RangofechaComponent } from './reportes/rangofecha/rangofecha.component';
import { EstadoreunionComponent } from './reportes/estadoreunion/estadoreunion.component';

const routes: Routes = [
    // Home
    { path: '', component: HomeComponent, data: { titulo: 'Pagina de inicio' } }, // Path inicial
    { path: 'reuniones', component: ReunionesComponent, data: { titulo: 'Reuniones' } }, // Path inicial
    { path: 'porfecha', component: PorfechaComponent, data: { titulo: 'Reporte por fecha' } }, // Path inicial
    { path: 'pormotivo', component: PormotivoComponent, data: { titulo: 'Reporte por Motivo' } }, // Path inicial
    { path: 'rangofechas', component: RangofechaComponent, data: { titulo: 'Reporte por rango de fechas' } }, // Path inicial
    { path: 'estadoreunion', component: EstadoreunionComponent, data: { titulo: 'Reporte por estado reunión' } }, // Path inicial
    // { path: 'correspondencia', component: CorrespondenciaComponent, data: { titulo: 'Correspondencia' } }, // Path inicial
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChildRoutesModule { }