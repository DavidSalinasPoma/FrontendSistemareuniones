import { Component, OnInit } from '@angular/core';

// Para utilizar formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Motras ntificaciones en tarjetas
import Swal from 'sweetalert2';

// Para navegar de una pagina a otra
import { Router } from '@angular/router';
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

  ngOnInit(): void {
  }

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
    this.cargando = true;
    this.usuarioServices.login(this.formulario.value)
      .subscribe(resp => {

        this.router.navigateByUrl('/home');
        this.cargando = false;
        // Usuarios del sistema
        // const userSistema: any = {
        //   id: resp.users.id,
        //   nombre: resp.users.persona.nombres,
        //   paterno: resp.users.persona.ap_paterno,
        //   materno: resp.users.persona.ap_materno,
        //   email: resp.users.email,
        //   fecha: resp.users.created_at
        // }

        // Variables local de usuario autenticado
        // localStorage.setItem('acces', JSON.stringify(userSistema));

        // remember
        if (this.formulario.get('remember')?.value) {
          localStorage.setItem('email', this.formulario.get('email')?.value)
        } else {
          localStorage.removeItem('email');
        }

        // console.log(respToken);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Login correcto!',
          // text: `Bienvenid@ ${resp.users.persona.nombres} ${resp.users.persona.ap_paterno} ${resp.users.persona.ap_materno}`,
          showConfirmButton: false,
          timer: 4000
        })
        // Navegar al dashboar
        // setTimeout(() => {
        // this.router.navigateByUrl('/');
        // }, 1000);

      }, (err) => {
        // Si sucede un error
        // console.log(err);

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
