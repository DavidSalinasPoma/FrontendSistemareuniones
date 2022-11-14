import { Component, OnInit } from '@angular/core';

// Formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios de usuario
import { UsuariosService } from 'src/app/services/usuarios.service';


// Motras ntificaciones en tarjetas
import Swal from 'sweetalert2';

import { ToastrService } from 'ngx-toastr';
import { ReunionesService } from 'src/app/services/reuniones.service';

// Utilizando jquery
declare var JQuery: any;
declare var $: any;

// Manejo de fechas
import * as moment from 'moment';

interface Estado {
  value: number;
  estado: string;
}

@Component({
  selector: 'app-reuniones',
  templateUrl: './reuniones.component.html',
  styleUrls: ['./reuniones.component.css']
})
export class ReunionesComponent implements OnInit {

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

  // Lista de todas reuniones
  public reuniones: any[] = [];

  // loading
  public cargando: boolean = true;

  public idReunion: number = 0;

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
    this.indexReuniones();

  }

  /**
  * crearFormulario
  */
  public crearFormulario() {
    this.formulario = this.fb.group({
      // nombres: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])],
      // apellidos: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])],
      motivo: ['', [Validators.required]],
      asunto: ['', [Validators.required]],
      prioridad: ['', [Validators.required]],
      fecha_reunion: ['', [Validators.required]],
    });
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

  // Validaciones para formulario
  get motivo() {
    return this.formulario.get('motivo');
  }
  get asunto() {
    return this.formulario.get('asunto');
  }
  get prioridad() {
    return this.formulario.get('prioridad');
  }
  get fecha_reunion() {
    return this.formulario.get('fecha_reunion');
  }

  /**
   * submit
   */
  public submit() {

    let usuarioActual: any;
    const infoToken = localStorage.getItem('token');
    if (infoToken) {
      const { identity } = JSON.parse(infoToken);
      usuarioActual = identity;
    }

    const formData = {
      motivo: this.formulario.value.motivo,
      asunto: this.formulario.value.asunto,
      prioridad: this.formulario.value.prioridad,
      fecha_reunion: new Date(this.formulario.value.fecha_reunion).toLocaleDateString(),
      usuarios_id: usuarioActual.sub
    }

    this.usuarioServices.storeUsuario(formData)
      .subscribe(({ status, message }) => {

        if (status === 'success') {
          $('#myModal_agregar').modal('hide');
          this.indexReuniones();
          this.toastr.success(message, 'Sistema de Conflictos');
        } else {
          this.toastr.error(message, 'Sistema de Conflictos');
        }
      }, (err) => {
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
  public indexReuniones() {
    this.cargando = true;
    this.usuarioServices.indexUsuarios()
      .subscribe(({ reuniones }) => {
        // console.log(reuniones);
        this.reuniones = reuniones.data;
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
              this.indexReuniones();
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
      motivo: this.formularioModificar.value.motivoModificar,
      asunto: this.formularioModificar.value.asuntoModificar,
      prioridad: this.formularioModificar.value.prioridadModificar,
      fecha_reunion: new Date(this.formularioModificar.value.fecha_reunionModificar).toLocaleDateString(),
      estado: this.formularioModificar.value.estado,
      estado_reunion: this.formularioModificar.value.estado_reunion,
    }

  }

  /**
   * modificarReunion
   */
  public modificarReunion(id: number) {
    this.idReunion = id;
    this.reunionesServices.showReuniones(id)
      .subscribe(({ reunion }) => {
        console.log(reunion);
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

}
