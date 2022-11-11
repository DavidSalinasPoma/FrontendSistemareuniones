import { Component, OnInit } from '@angular/core';

// Formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios de usuario
import { UsuariosService } from 'src/app/services/usuarios.service';


// Motras ntificaciones en tarjetas
import Swal from 'sweetalert2';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-reuniones',
  templateUrl: './reuniones.component.html',
  styleUrls: ['./reuniones.component.css']
})
export class ReunionesComponent implements OnInit {

  // Formularios reactivos
  public formulario!: FormGroup;

  // Lista de todas reuniones
  public reuniones: any[] = [];

  // loading
  public cargando: boolean = true;

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
    private toastr: ToastrService
  ) {
    this.crearFormulario();
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
    })
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

}
