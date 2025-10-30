import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Estudiante } from '../../models/estudiante';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  // Indicamos que es un componente standalone (no depende de un NgModule)
  imports: [CommonModule, FormsModule],
  templateUrl: './estudiantes.html',
  styleUrls: ['./estudiantes.css']
})
export class EstudiantesComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  estudianteSeleccionado: Estudiante = { firstName: '', lastName: '' };
  constructor(private estudiantesService: EstudiantesService) { }
   // Inyección del servicio que maneja la comunicación con la API

  ngOnInit(): void {
  // Hook que se ejecuta al iniciar el componente
    this.cargarEstudiantes(); 
  }

  // Función que carga todos los estudiantes desde la API
  cargarEstudiantes() {
    this.estudiantesService.getAll().subscribe({ 
      next: (data: Estudiante[]) => {
        this.estudiantes = data; 
      },
      error: (err) => console.error('Error cargando estudiantes', err)
    });
  }

  // Función para agregar un nuevo estudiante
  agregar() {
    this.estudiantesService.save(this.estudianteSeleccionado).subscribe(() => { 
      this.cargarEstudiantes(); 
      this.limpiarFormulario(); 
    });
  }

  editar(est: Estudiante) { // Función para editar un estudiante existente
    this.estudianteSeleccionado = { ...est }; 
  }

  actualizar() { // Función para actualizar los datos del estudiante
    if (this.estudianteSeleccionado.id) { 
      this.estudiantesService.edit(this.estudianteSeleccionado).subscribe(() => { 
        this.cargarEstudiantes(); 
        this.limpiarFormulario(); 
      });
    }
  }

  eliminar(id?: string) { // Función para eliminar un estudiante
    if (!id) return; 
    this.estudiantesService.delete(id).subscribe(() => {
      this.cargarEstudiantes(); 
    }); 
  }

  limpiarFormulario() { // Función para limpiar el formulario
    this.estudianteSeleccionado = { firstName: '', lastName: '' }; // Resetea el objeto del estudiante seleccionado
  }
}