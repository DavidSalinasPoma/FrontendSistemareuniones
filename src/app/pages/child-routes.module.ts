import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


// Componetes de PAGES
import { HomeComponent } from './home/home.component';

// Componentes de APP
import { LoginComponent } from '../auth/login/login.component';


const routes: Routes = [
    // Home
    { path: '', component: HomeComponent, data: { titulo: 'Pagina de inicio' } }, // Path inicial
    // { path: 'correspondencia', component: CorrespondenciaComponent, data: { titulo: 'Correspondencia' } }, // Path inicial
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChildRoutesModule { }