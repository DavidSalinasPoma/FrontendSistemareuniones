import { Component, OnInit } from '@angular/core';

// Formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios de usuario
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ReunionesService } from 'src/app/services/reuniones.service';

// Modelo
import { Reunion } from './../../models/reunion.model';

// Motras ntificaciones en tarjetas
import Swal from 'sweetalert2';

import { ToastrService } from 'ngx-toastr';

// Utilizando jquery
declare var JQuery: any;
declare var $: any;

// Manejo de fechas
import * as moment from 'moment';

// Sanetizar HTML
import * as sanitizeHtml from 'sanitize-html';

interface Estado {
  value: number;
  estado: string;
}


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  // Formularios reactivos
  public formulario!: FormGroup;
  public formularioModificar!: FormGroup;

  estados: Estado[] = [
    { value: 0, estado: 'Inhabilitado' },
    { value: 1, estado: 'Habilitado' }
  ];

  estadoReunion: Estado[] = [
    { value: 0, estado: 'Pendiente' },
    { value: 1, estado: 'Concluido' }
  ];

  roles: Estado[] = [
    { value: 0, estado: 'Secretaria' },
    { value: 1, estado: 'Administrador' },
  ];

  // Lista de todas reuniones
  public reuniones: any[] = [];

  public usuarios: any[] = [];

  // loading
  public cargando: boolean = true;

  public idReunion: number = 0;

  public reunionMostrar?: Reunion;


  // Propiedades para editor de texto
  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'header': [2, 3, false] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'align': [] }],
        ['clean'],
        ['link']
      ]
    }
  }



  constructor(
    private fb: FormBuilder,
    private usuarioServices: UsuariosService,
    private toastr: ToastrService,
    private reunionesServices: ReunionesService
  ) {
    this.crearFormulario();
    this.crearFormularioModificar();
    moment.locale('es');
  }

  ngOnInit(): void {
    this.indexUsuarios();
  }

  /**
  * crearFormulario
  */
  public crearFormulario() {
    this.formulario = this.fb.group({
      nombres: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])],
      apellidos: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&' * +/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
      password: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  // Validaciones para formulario
  get nombres() {
    return this.formulario.get('nombres');
  }
  get apellidos() {
    return this.formulario.get('apellidos');
  }
  get email() {
    return this.formulario.get('email');
  }
  get password() {
    return this.formulario.get('password');
  }

  get rol() {
    return this.formulario.get('rol');
  }

  get descripcion() {
    return this.formulario.get('descripcion');
  }

  /**
   * crearFormularioModificar
   */
  public crearFormularioModificar() {
    this.formularioModificar = this.fb.group({
      motivoModificar: ['', [Validators.required]],
      asuntoModificar: ['', [Validators.required]],
      prioridadModificar: ['', [Validators.required]],
      fecha_reunionModificar: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      estado_reunion: ['', [Validators.required]],
    });
  }



  /**
   * submit
   */
  public submit() {

    this.usuarioServices.storeUsuarioDos(this.formulario.value)
      .subscribe(({ status, message }) => {

        if (status === 'success') {
          $('#myModal_agregar').modal('hide');
          this.indexUsuarios();
          this.toastr.success(message, 'Sistema de Conflictos');
        } else {
          this.toastr.error(message, 'Sistema de Conflictos');
        }
      }, (err) => {
        console.log(err);

        Swal.fire('Error', err.error.message, 'error')
      });
  }

  // Editor de texto

  /**
   * blur
   */
  public blur() {
    console.log('blur');
  }

  /**
   * onSelectionChanged
   */
  public onSelectionChanged() {
    console.log('onSelectionChanged');
  }

  /**
   * indexReuniones
   */
  public indexUsuarios() {
    this.cargando = true;
    this.usuarioServices.indexUsuariosDos()
      .subscribe(({ usuarios }) => {
        // console.log(reuniones);
        this.usuarios = usuarios;
        this.cargando = false;
      })
  }

  /**
   * destroyPersona
   */
  public destroyReunion(id: number, motivo: string) {


    Swal.fire({
      title: 'Esta Seguro de Eliminar?',
      text: `Esta a punto de eliminar la reunión con motivo: ${motivo}`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar!',
      confirmButtonText: 'Si, dar de Baja!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioServices.destroyPersona(id)
          .subscribe(({ status, message }) => {
            if (status === 'success') {
              this.indexUsuarios();
              Swal.fire(
                'Reunión dado de Baja!',
                `${message}`,
                'success'
              );
            }


          }, (err) => {
            Swal.fire('Error', err.error.message, 'error')
          });
      }
    })

  }

  /**
   * submitModificar
   */
  public submitModificar() {
    const formData = {
      motivo: (this.formularioModificar.value.motivoModificar).toUpperCase(),
      asunto: this.formularioModificar.value.asuntoModificar,
      prioridad: this.formularioModificar.value.prioridadModificar,
      fecha_reunion: new Date(this.formularioModificar.value.fecha_reunionModificar).toLocaleDateString(),
      estado: this.formularioModificar.value.estado,
      estado_reunion: this.formularioModificar.value.estado_reunion,
    }

    console.log(formData);


    this.reunionesServices.updateReuniones(formData, this.idReunion)
      .subscribe(({ message }) => {
        this.indexUsuarios();
        $('#myModal_modificar').modal('hide');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Modificación Correcta!',
          text: `${message}`,
          showConfirmButton: false,
          timer: 3000
        })
      }, (err) => {
        console.log(err);
        Swal.fire('Error', err.error.message, 'error')
      }
      );
  }

  /**
   * modificarReunion
   */
  public modificarReunion(id: number) {
    this.idReunion = id;

    this.reunionesServices.showReuniones(id)
      .subscribe(({ reunion }) => {

        this.formularioModificar.setValue({
          motivoModificar: reunion.motivo,
          asuntoModificar: reunion.asunto,
          prioridadModificar: reunion.prioridad,
          fecha_reunionModificar: new Date(moment(reunion.fecha_reunion).format('YYYY/MM/DD')).toISOString(),
          estado: reunion.estado,
          estado_reunion: reunion.estado_reunion
        });

      }, (err) => {
        Swal.fire('Error', err.error.message, 'error')
      });

    $('#myModal_modificar').modal('show');
  }


  // Validaciones para formulario
  get motivoModificar() {
    return this.formularioModificar.get('motivoModificar');
  }
  get asuntoModificar() {
    return this.formularioModificar.get('asuntoModificar');
  }
  get prioridadModificar() {
    return this.formularioModificar.get('prioridadModificar');
  }
  get fecha_reunionModificar() {
    return this.formularioModificar.get('fecha_reunionModificar');
  }
  get estado() {
    return this.formularioModificar.get('estado');
  }
  get estado_reunion() {
    return this.formularioModificar.get('estado_reunion');
  }

  /**
   * name
   */
  public mostrarReunion(id: number) {
    this.reunionesServices.showReuniones(id)
      .subscribe(({ reunion }) => {
        console.log(reunion);
        this.reunionMostrar = reunion;
        $('#myModal_mostrar').modal('show');
      });
  }

  /**
   * imprimirPDF
   */
  public imprimirPDF() {
    $('#myModal_mostrar').modal('hide');
  }

}
