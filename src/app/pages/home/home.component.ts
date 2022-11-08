import { Component, OnInit } from '@angular/core';
// Formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Formularios reactivos
  public formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
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
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      motivo: ['', [Validators.required]],
      asunto: ['', [Validators.required]],
      prioridad: ['', [Validators.required]],
      fecha_reunion: ['', [Validators.required]],
    })
  }

  // Validaciones para formulario
  get nombres() {
    return this.formulario.get('nombres');
  }
  get apellidos() {
    return this.formulario.get('apellidos');
  }
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
    console.log('Hola Mundo');

  }

}
