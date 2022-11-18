import { Component, OnInit } from '@angular/core';

// Formularios
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios
import { ReunionesService } from 'src/app/services/reuniones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

// Modelos
import { Reunion } from 'src/app/models/reunion.model';

// Alertas
import { ToastrService } from 'ngx-toastr';


// Utilizando jquery
declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-pormotivo',
  templateUrl: './pormotivo.component.html',
  styleUrls: ['./pormotivo.component.css']
})
export class PormotivoComponent implements OnInit {
  // Formularios reactivos
  public formulario!: FormGroup;

  // loading
  public cargando: boolean = true;

  // Lista de todas reuniones
  public reuniones: any[] = [];

  public reunionMostrar?: Reunion;

  constructor(
    private fb: FormBuilder,
    private usuarioServices: UsuariosService,
    private reunionesServices: ReunionesService,
    private toastr: ToastrService,
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
      motivo: ['', [Validators.required]],
    });
  }

  /**
   * submit
   */
  public submit() {
    this.reunionesServices.buscarReuniones(this.formulario.value)
      .subscribe(({ reuniones }) => {
        console.log(reuniones);
        this.reuniones = reuniones;
      })
  }

  // Validaciones para formulario
  get motivo() {
    return this.formulario.get('motivo');
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

