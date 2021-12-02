/**
 * Importaciones necesarias de:
 * Angular
 * HttpClient en el CoreService
 * Alertas y Confirmation
 * Forms
 */
import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../core/services/core.service';
import { ConfirmationService } from 'primeng/api';
import { AlertasService } from '../../core/services/alerta.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {

  /**
   * Declaración de variables 
   */
  registrosLista: any = [];
  columnas: any = [];
  listaSexo: any = [];
  listaEstrato: any = [];
  mostrarTabla: Boolean = true;
  mostrarAgregar: Boolean = false;
  mostrarActualizar: Boolean = false;
  mostrarFormulario: Boolean = false;
  mostrarCalculo: Boolean = false;
  submitted: Boolean = false;
  botonGuardar: Boolean = false;
  botonActualizar: Boolean = false;
  idEmpleado: any;
  edad: number = 0;
 
  /**
   * Declaración e inicialización de formulario
   */
  formulario = new FormGroup({
     nombre: new FormControl('', Validators.compose([Validators.required])),
     apellido: new FormControl('', Validators.compose([Validators.required])),
     fechaNacimiento: new FormControl('', Validators.compose([Validators.required])),
     sexo: new FormControl('', Validators.compose([Validators.required])),
     fechaIngreso: new FormControl('', Validators.compose([Validators.required])),
     estrato: new FormControl('', Validators.compose([Validators.required])),
     edad: new FormControl(''),
     calculo: new FormControl('')
   });
 
  constructor(
    public coreService: CoreService,
    public confirmationService: ConfirmationService,
    public msj: AlertasService
  ) {
    /**
     * Inicializando la variable listaEstrato
     */
    this.listaEstrato = [
      { descripcion: '1', id: 1 },
      { descripcion: '2', id: 2 },
      { descripcion: '3', id: 3 },
      { descripcion: '4', id: 4 },
      { descripcion: '5', id: 5 },
      { descripcion: '6', id: 6 }
    ];

    /**
     * Inicializando la variable listaSexo
     */
    this.listaSexo = [
      {descripcion: 'MASCULINO', id: 'MASCULINO'},
      {descripcion: 'FEMENINO', id: 'FEMENINO'},
      {descripcion: 'INDEFINIDO', id: 'INDEFINIDO'},
    ];

  }
 
  ngOnInit(): void {
    /**
     * Columnas pertenecientes a la tabla
     */
    this.columnas = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellido', header: 'Apellido' },
      { field: 'fechaNacimiento', header: 'Fecha de Nacimiento' },
      { field: 'edad', header: 'Edad' },
      { field: 'sexo', header: 'Sexo' },
      { field: 'fechaIngreso', header: 'Fecha de Ingreso' },
      { field: 'estrato', header: 'Estrato' }
    ];

    this.getListadoEmpleado();
  }

  /**
   * Funcion de preparar un nuevo registro en el formulario
   */
  prepararNuevo() {
    this.mostrarAgregar = true;
    this.mostrarFormulario = true;
    this.mostrarTabla = false;
    this.mostrarActualizar = false;
    this.mostrarCalculo = false;
    this.formulario.reset();
  }

  /**
   * Funcion de volver a la tabla con los registros de empleados
   */
  volver() {
    this.mostrarTabla = true;
    this.mostrarCalculo = false;
    this.mostrarFormulario = false;
    this.mostrarActualizar = false;
    this.mostrarAgregar = false;
    this.submitted = false;
  }

  /**
   * Funcion de ver el  calculo del nombre del empleado
   */
   calculo(data: any) {
    this.mostrarCalculo = true;
    this.mostrarTabla = false;
    this.mostrarFormulario = false;
    this.mostrarActualizar = false;
    this.mostrarAgregar = false;
    this.submitted = false;
    this.formulario.controls['calculo'].setValue(data.calculo);
  }
 
  /**
  * Función para traer los registros según el id del pedido
  */
  getListadoEmpleado() {
    this.coreService.get('/empleados').subscribe(
      (res: any = []) => {
        this.registrosLista = res;
        this.registrosLista.forEach((element: { [x: string]: any; }) => {
          element["calculo"] = this.conteoNombre(element["nombre"], element["apellido"]);
        });
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  /**
   * Función para crear un nuevo empleado
   */
   guardar() {
    var dat = this.formulario.valid;
    if (dat) {
      this.confirmationService.confirm({
        message: '¿Desea crear este empleado?',
        accept: () => {
          this.submitted = true;
          this.postCrearEmpleado();
          this.mostrarFormulario = false;
          this.mostrarActualizar = false;
          this.mostrarCalculo = false;
          this.mostrarTabla = true;
          this.mostrarAgregar = false;
        }
      });
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  /**
   * Función para lanzar una petición al backend y agregar un empleado
   */
  postCrearEmpleado() {
    // Definicion de parametros para enviar al backend al momento de crear un empleado
    let params = {
      nombre: this.formulario.value.nombre,
      apellido: this.formulario.value.apellido,
      fechaNacimiento: this.formulario.value.fechaNacimiento,
      edad: this.formulario.value.edad,
      sexo: this.formulario.value.sexo.id,
      fechaIngreso: this.formulario.value.fechaIngreso,
      estrato: this.formulario.value.estrato.id
    }

    // Envío de petición al backend para crear un empleado
    this.coreService.post('/empleado/', params).subscribe(
      (res: any = []) => {
        this.msj.info('Empleado creado correctamente');
        this.getListadoEmpleado();
      },
      (err: any) => {
        if (err.errors.error !== undefined && err.errors.error !== null) {
          for (let index = 0; index < err.errors.error.length; index++) {
            this.msj.error(err.errors.error[index]);
          }
        }
      }
    )
  }

  /**
   * Función para actualizar a un empleado de acuerdo a un id
   */
   editar(data: any) {
    this.mostrarFormulario = true;
    this.mostrarActualizar = true;
    this.mostrarCalculo = false;
    this.mostrarTabla = false;
    this.mostrarAgregar = false;
    this.idEmpleado = data._id;
    this.formulario.controls['nombre'].setValue(data.nombre);
    this.formulario.controls['apellido'].setValue(data.apellido);
    this.formulario.controls['fechaNacimiento'].setValue(new Date(data.fechaNacimiento));
    this.formulario.controls['edad'].setValue(data.edad);
    this.formulario.controls['sexo'].setValue(this.cargarListaSexo(this.listaSexo ,data.sexo));
    this.formulario.controls['fechaIngreso'].setValue(new Date(data.fechaIngreso));
    this.formulario.controls['estrato'].setValue(this.cargarListaEstrato(this.listaEstrato, data.estrato));
  }

  /**
   * Función que recorre una lista y busca un match de acuerdo a un valor
   * @param iLista 
   * @param valor 
   * @returns 
   */
  cargarListaEstrato(iLista: any, valor: any) {
    if (iLista !== undefined && iLista != null) {
      for (let i = 0; i < iLista.length; i++) {
        if (iLista[i].id === valor) {
          return iLista[i];
        }
      }
    }
  }

  /**
   * Función que recorre una lista y busca un match de acuerdo a un valor
   * @param iLista 
   * @param valor 
   * @returns 
   */
  cargarListaSexo(iLista: any, valor: any) {
    if (iLista !== undefined && iLista != null) {
      for (let i = 0; i < iLista.length; i++) {
        if (iLista[i].id === valor) {
          return iLista[i];
        }
      }
    }
  }

  /**
   * Función para enviar mensaje de confirmación y realizar la actualización del empleado
   */
  actualizar() {
    let dat = this.formulario.valid;
    if (dat) {
      this.confirmationService.confirm({
        message: '¿Desea actualizar este empleado?',
        accept: () => {
          this.formulario.markAllAsTouched();
          this.submitted = true;
          this.putActualizarSubcategoria();
          this.mostrarTabla = true;
          this.mostrarFormulario = false;
          this.mostrarActualizar = false;
          this.mostrarCalculo = false;
          this.mostrarAgregar = false;
        }
      });
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  /**
   * Función para lanzar una petición al backend y actualizar un empleado de acuerdo a su id
   */
  putActualizarSubcategoria() {
    // Definicion de parametros para enviar al backend al momento de actualizar un empleado
    let params = {
      id: this.idEmpleado,
      nombre: this.formulario.value.nombre,
      apellido: this.formulario.value.apellido,
      fechaNacimiento: this.formulario.value.fechaNacimiento,
      edad: this.formulario.value.edad,
      sexo: this.formulario.value.sexo.id,
      fechaIngreso: this.formulario.value.fechaIngreso,
      estrato: this.formulario.value.estrato.id
    }

    // Envío de petición al backend para actualizar un empleado
    this.coreService.put('/empleado', params).subscribe(
      (res: any = []) => {
        this.msj.info("Empleado actualizado correctamente.");
        this.getListadoEmpleado();
      },
      (err: any) => {
        if (err.errors.error !== undefined && err.errors.error !== null) {
          for (let index = 0; index < err.errors.error.length; index++) {
            this.msj.error(err.errors.error[index]);
          }
        }
      }
    )
  }

  /**
   * Función para eliminar a un empleado de acuerdo a un id
   */
   eliminar(id: any) {
    this.eliminarEmpleado(id);
  }

  /**
   * Función para lanzar una petición al backend y eliminar un empleado según su id
   */
  eliminarEmpleado(id: any) {
    this.coreService.delete('/empleado', id).subscribe(
      (res: any = []) => {
        this.msj.info('Se eliminó el empleado correctamente');
        this.getListadoEmpleado();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  /**
   * Función para calcular las letras del nombre
   */
  conteoNombre(nombre: any, apellido: any) {
    let nombre_c = nombre.trim() + apellido.replace(/ /g, "");
    let nombre_completo = nombre_c.split('');

    let diccionario:any = {};
    nombre_completo.forEach((element: string | number) => {
      if(diccionario[element] === undefined){
        diccionario[element] = 1;
      } else {
        diccionario[element] = diccionario[element] + 1;
      }
    });

    return JSON.stringify(diccionario); 
  }

  /**
   * Función para calcular la edad según la fecha de nacimiento
   * @param fecha 
   */
  calcularEdad() {
    if(this.formulario.value.fechaNacimiento){
      var diferencia = Math.abs(Date.now() - this.formulario.value.fechaNacimiento);
      this.edad = Math.floor((diferencia / (1000 * 3600 * 24))/365);
      this.formulario.controls['edad'].setValue(this.edad);
    }
  }

  /**
   * Validaciones de mayúsculas en el formulario
   */
  mayusculaNombre(e: any) {
    if (e.target.value !== null) {
      this.formulario.controls['nombre'].setValue(e.target.value.toUpperCase());
    }
  }

  mayusculaApellido(e: any) {
    if (e.target.value !== null) {
      this.formulario.controls['apellido'].setValue(e.target.value.toUpperCase());
    }
  }
 
  /**
  * Validacion del campo
  */
  campoNoValido(campo: any) {
    return this.formulario.get(campo)?.invalid && this.formulario.get(campo)?.touched;
  }
}