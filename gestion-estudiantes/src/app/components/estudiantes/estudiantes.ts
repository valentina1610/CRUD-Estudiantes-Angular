// Importamos decoradores y módulos de Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Elimino el HttpClientModule porque es obsoleto, en cambio utilizo el provider en el main.ts
// Importamos nuestro servicio y modelo
import { EstudiantesService } from '../../services/estudiantes.service';
import { Estudiante } from '../../models/estudiante';

@Component({
  selector: 'app-estudiantes',
  // Nombre del componente que se usa en el HTML como etiqueta
  standalone: true,
  // Indicamos que es un componente standalone (no depende de un NgModule)
  imports: [CommonModule, FormsModule],
  // Módulos que este componente necesita 
  templateUrl: './estudiantes.html',
  // Ruta del archivo HTML del componente
  styleUrls: ['./estudiantes.css']
  // Archivo CSS con los estilos del componente
})
export class EstudiantesComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  // Lista que guarda todos los estudiantes
  estudianteSeleccionado: Estudiante = { firstName: '', lastName: '' };
  // Objeto que representa el estudiante que se está editando o agregando
  constructor(private estudiantesService: EstudiantesService) { }
   // Inyección del servicio que maneja la comunicación con la API

  ngOnInit(): void {
  // Hook que se ejecuta al iniciar el componente
    this.cargarEstudiantes();  // Llama a la función para traer los datos al arrancar
  }

  // Función que carga todos los estudiantes desde la API
  cargarEstudiantes() {
    this.estudiantesService.getAll().subscribe({ // Llama al servicio para obtener todos los estudiantes
      next: (data: Estudiante[]) => {
        this.estudiantes = data; // Asigna los datos que vienen de la API
      },
      error: (err) => console.error('Error cargando estudiantes', err)
    });
  }

  // Función para agregar un nuevo estudiante
  agregar() {
    this.estudiantesService.save(this.estudianteSeleccionado).subscribe(() => { // Llama al servicio para guardar el estudiante
      this.cargarEstudiantes(); // Recarga la lista de estudiantes
      this.limpiarFormulario(); // Limpia el formulario después de agregar
    });
  }

  editar(est: Estudiante) { // Función para editar un estudiante existente
    this.estudianteSeleccionado = { ...est }; // Clona el estudiante seleccionado para editar
  }

  actualizar() { // Función para actualizar los datos del estudiante
    if (this.estudianteSeleccionado.id) { // Verifica que el estudiante tenga un ID
      this.estudiantesService.edit(this.estudianteSeleccionado).subscribe(() => { // Llama al servicio para actualizar el estudiante
        this.cargarEstudiantes(); // Recarga la lista de estudiantes
        this.limpiarFormulario(); // Limpia el formulario después de actualizar
      });
    }
  }

  eliminar(id?: string) { // Función para eliminar un estudiante
    if (!id) return;  // Si no hay ID, no hace nada
    this.estudiantesService.delete(id).subscribe(() => { // Llama al servicio para eliminar el estudiante
      this.cargarEstudiantes(); // Recarga la lista de estudiantes
    }); 
  }

  limpiarFormulario() { // Función para limpiar el formulario
    this.estudianteSeleccionado = { firstName: '', lastName: '' }; // Resetea el objeto del estudiante seleccionado
  }
}