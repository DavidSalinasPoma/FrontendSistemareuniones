import { Component, OnInit } from '@angular/core';
// Para navegar de una pagina a otra
import { Router } from '@angular/router';

@Component({
  selector: 'app-menunavegacion',
  templateUrl: './menunavegacion.component.html',
  styleUrls: ['./menunavegacion.component.css']
})
export class MenunavegacionComponent implements OnInit {

  public usuario: any;
  public token: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('token');
    if (user) {
      const { token, identity } = JSON.parse(user);
      this.usuario = identity;
      this.token = token;
    }
  }
  /**
   * logout
   */
  public logout() {

    localStorage.removeItem('token');

    this.usuario = null;
    this.token = null;

    // Redireccionar al la pagina principal
    this.router.navigate(['/login']);

  }

}
