import { Component, OnInit } from '@angular/core';

// Para utilizar formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Motras ntificaciones en tarjetas
import Swal from 'sweetalert2';

// Para navegar de una pagina a otra
import { Router, ActivatedRoute, Params } from '@angular/router';

// Servicios
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  public cargando = false;

  // Formularios
  public formulario!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioServices: UsuariosService
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void { }

  /**
   * crearFormulario
   */
  public crearFormulario() {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&' * +/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]],
      password: ['', Validators.required],
      remember: [false]
    })
  }

  /**
   * login de Usuarios
   */
  public login() {

    // Spinner de ingresando al sistema
    this.cargando = true;

    this.usuarioServices.login(this.formulario.value)
      .subscribe(resp => {

        if (resp.token) {

          this.cargando = false;

          this.router.navigateByUrl('/home');

          // remember
          if (this.formulario.get('remember')?.value) {
            localStorage.setItem('email', this.formulario.get('email')?.value)
          } else {
            localStorage.removeItem('email');
          }

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Login correcto!',
            text: `Bienvenid@ ${resp.identity.nombres} ${resp.identity.apellidos}`,
            showConfirmButton: false,
            timer: 2000
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Credenciales Incorrectas..!',
            text: 'Vuelva a intentarlo!',
            footer: 'Gobierno Autónomo Departamental de Cochabamba'
          })
          this.cargando = false;
        }

      }, (err) => {
        Swal.fire('Error', err.error.message, 'error')
        this.cargando = false;
      }
      )
  }

  // Validaciones para formulario
  get evento() {
    return this.formulario.get('email');
  }
  get descripcion() {
    return this.formulario.get('password');
  }
  get remenber() {
    return this.formulario.get('remenber');
  }

}
