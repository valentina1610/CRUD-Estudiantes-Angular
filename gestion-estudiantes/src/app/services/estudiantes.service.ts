// Importamos los decoradores y herramientas necesarias de Angular
import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';// Para hacer peticiones HTTP (GET, POST, PUT, DELETE)
import { Observable } from 'rxjs'; // Permite manejar las respuestas asíncronas de las peticiones
import { Estudiante } from '../models/estudiante'; // Importamos la interfaz del modelo Estudiante

// Decorador que indica que este servicio puede ser inyectado en toda la aplicación
@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible globalmente (no hace falta importarlo en providers)
})
export class EstudiantesService {
  private url = 'https://681cdcfaf74de1d219ae0c04.mockapi.io/students';
  // URL base de la API 

  constructor(private http: HttpClient) { }
    // Inyectamos el módulo HttpClient para poder hacer las peticiones a la API


  getAll(): Observable<Estudiante[]> {
    // Obtiene todos los estudiantes (GET)
    return this.http.get<Estudiante[]>(this.url);
    // Hace una petición GET a la URL y devuelve un Observable de tipo Estudiante[]
  }

  save(estudiante: Estudiante): Observable<Estudiante> {
    // Guarda un nuevo estudiante (POST)
    return this.http.post<Estudiante>(this.url, estudiante);
    // Envía los datos del nuevo estudiante al servidor

  }

  edit(estudiante: Estudiante): Observable<Estudiante> {
    // Edita un estudiante existente (PUT)
    return this.http.put<Estudiante>(`${this.url}/${estudiante.id}`, estudiante);
    // Hace una petición PUT a la URL con el ID del estudiante y le pasa el objeto completo con los datos actualizados
  }

  delete(id: string): Observable<any> {
    // Elimina un estudiante por su ID (DELETE)
    return this.http.delete(`${this.url}/${id}`);
    // Hace una petición DELETE a la URL con el ID del estudiante
  }
}
