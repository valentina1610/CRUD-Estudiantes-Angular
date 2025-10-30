import { Component, signal } from '@angular/core'; // Importamos Component y signal de Angular
import { RouterOutlet } from '@angular/router'; // Importamos RouterOutlet para manejar las rutas
import { EstudiantesComponent } from './components/estudiantes/estudiantes'; // <-- Importo el EstudiantesComponent en el archivo app.ts
@Component({  
  selector: 'app-root', // Nombre del componente que se usa en el HTML como etiqueta
  imports: [RouterOutlet, EstudiantesComponent], // <-- Lo importo al componente
  templateUrl: './app.html', // Ruta del archivo HTML 
  styleUrl: './app.css' // Archivo CSS con los estilos
})
export class App { 
  protected readonly title = signal('gestion-estudiantes'); 
}
