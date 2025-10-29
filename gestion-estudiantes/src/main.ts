import { bootstrapApplication } from '@angular/platform-browser'; // Importamos la función para bootstrappear la aplicación
import { App } from './app/app'; // Importamos el componente raíz de la aplicación
import { provideHttpClient } from '@angular/common/http'; // <-- Agrego la dependencia de HttpClient al main

bootstrapApplication(App,{ // <-- Debe renderizar el componente App o AppComponent
  providers: [provideHttpClient()] //<-- Agrego el HttpClient al proyecto
}) 
  .catch(err => console.error(err));

