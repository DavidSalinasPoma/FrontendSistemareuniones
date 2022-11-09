import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Componetes de PAGES
import { HomeComponent } from './home/home.component';
import { ReunionesComponent } from './reuniones/reuniones.component';

const routes: Routes = [
    // Home
    { path: '', component: HomeComponent, data: { titulo: 'Pagina de inicio' } }, // Path inicial
    { path: 'reuniones', component: ReunionesComponent, data: { titulo: 'Reuniones' } }, // Path inicial
    // { path: 'correspondencia', component: CorrespondenciaComponent, data: { titulo: 'Correspondencia' } }, // Path inicial
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChildRoutesModule { }