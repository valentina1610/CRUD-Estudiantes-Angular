import { Component, signal } from '@angular/core'; // Importamos Component y signal de Angular
import { RouterOutlet } from '@angular/router'; // Importamos RouterOutlet para manejar las rutas
import { EstudiantesComponent } from './components/estudiantes/estudiantes'; // <-- Importo el EstudiantesComponent en el archivo app.ts
@Component({  // Decorador que define un componente de Angular
  selector: 'app-root', // Nombre del componente que se usa en el HTML como etiqueta
  imports: [RouterOutlet, EstudiantesComponent], // <-- Lo importo al componente
  templateUrl: './app.html', // Ruta del archivo HTML del componente
  styleUrl: './app.css' // Archivo CSS con los estilos del componente
})
export class App { // Clase principal del componente App
  protected readonly title = signal('gestion-estudiantes'); // Señal reactiva que contiene el título de la aplicación
}
