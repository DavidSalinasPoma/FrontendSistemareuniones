import { Injectable } from '@angular/core';

// Para manejar las peticiones http// 
import { HttpClient, HttpHeaders } from '@angular/common/http';

// El tap un efecto secuendario
import { tap, map, catchError } from "rxjs/operators";
import { Observable, of, Subject } from 'rxjs';

// Variables globales
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

// Variables globales
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

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

  // Servicio para el login
  /**
   * login
   */
  public login(formData: Usuario) {
    // console.log(formData);

    return this.http.post(`${base_url}/api/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', JSON.stringify(resp))
        })
      )
  }

  /**
   * ValidarToken
   */
  public validarToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    // Implementando rxjs
    let tokenInfo$: Observable<string>;
    tokenInfo$ = of(token);
    return tokenInfo$.pipe(
      tap((resp: any) => {
        // console.log(resp);
        if (resp != '') {
          localStorage.setItem('token', resp);
        }
      }),
      map(resp => (resp === '') ? false : true)
    );

  }

  /**
   * indexUsuarios
   */
  public indexUsuarios() {
    let parameters = new HttpHeaders();
    parameters = parameters.set('token-usuario', this.token!);
    return this.http.get<any>(base_url + '/api/reuniones', { headers: parameters });
  }

  /**
   * storeUsuario
   */
  public storeUsuario(reuniones: any) {

    console.log(reuniones);


    let parameters = new HttpHeaders();
    parameters = parameters.set('token-usuario', this.token);
    return this.http.post<any>(base_url + '/api/reuniones', reuniones, { headers: parameters });
  }



  /**
   * eliminar Evento
   */
  public destroyPersona(id: number) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('token-usuario', this.token);
    return this.http.delete<any>(base_url + '/api/reuniones/' + id, { headers: parameters });
  }

}
