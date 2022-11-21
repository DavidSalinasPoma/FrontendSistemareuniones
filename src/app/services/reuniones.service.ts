import { Injectable } from '@angular/core';

// Para manejar las peticiones http// 
import { HttpClient, HttpHeaders } from '@angular/common/http';

// El tap un efecto secuendario
import { tap, map, catchError } from "rxjs/operators";
import { Observable, of, Subject } from 'rxjs';

// Variables globales
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Reunion } from '../models/reunion.model';


// Variables globales
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ReunionesService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  // Token de usuario
  get token() {
    let tokenActual: any;
    const infoToken = localStorage.getItem('token');
    if (infoToken) {
      const { token } = JSON.parse(infoToken);
      tokenActual = token;
    }
    return tokenActual;
  }

  /**
  * indexReuniones
  */
  public indexReuniones() {
    let parameters = new HttpHeaders();
    parameters = parameters.set('token-usuario', this.token!);
    return this.http.get<any>(base_url + '/api/reuniones', { headers: parameters });
  }

  /**
  * ShowReuniones
  */
  public showReuniones(id: number) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('token-usuario', this.token);
    return this.http.get<any>(base_url + `/api/reuniones/${id}`, { headers: parameters });
  }

  /**
 * storeUsuario
 */
  public storeReuniones(reuniones: any) {

    console.log(reuniones);

    let parameters = new HttpHeaders();
    parameters = parameters.set('token-usuario', this.token);
    return this.http.post<any>(base_url + '/api/reuniones', reuniones, { headers: parameters });
  }

  /**
* Buscar re9uniones
*/
  public buscarReuniones(reuniones: any) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('token-usuario', this.token);
    return this.http.post<any>(base_url + '/api/reuniones/buscarReuniones', reuniones, { headers: parameters });
  }

  /**
   * Buscar re9uniones por fechas
   */
  public buscarReunionesFechas(rangoFechas: any) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('token-usuario', this.token);
    return this.http.post<any>(base_url + '/api/reuniones/buscarReunionesFechas', rangoFechas, { headers: parameters });
  }



  /**
   * updateReuniones
   */
  public updateReuniones(formData: any, id: number) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('token-usuario', this.token);
    return this.http.put<any>(base_url + `/api/reuniones/${id}`, formData, { headers: parameters });
  }


  /**
 * eliminar Evento
 */
  public destroyReuniones(id: number) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('token-usuario', this.token);
    return this.http.delete<any>(base_url + '/api/reuniones/' + id, { headers: parameters });
  }


}
