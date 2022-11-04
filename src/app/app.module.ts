import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routing principal de APP
import { AppRoutingModule } from './app-routing.module';

// Componentes principales de APP
import { AppComponent } from './app.component';

// Modulos personalizados
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

// Para peticiones HTTP
import { HttpClientModule } from '@angular/common/http';

// Para refrescar la pagina WEB
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

// Notificaciones Toastr
import { ToastrModule } from 'ngx-toastr';
import { NopagescomponentComponent } from './nopagescomponent/nopagescomponent.component';


@NgModule({
  declarations: [
    AppComponent,
    NopagescomponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
