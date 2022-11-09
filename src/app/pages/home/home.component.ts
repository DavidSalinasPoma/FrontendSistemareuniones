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
    console.log(this.formulario.value);
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

}
