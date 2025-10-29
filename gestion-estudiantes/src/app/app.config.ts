import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core'; 
// Importamos las funciones necesarias para la configuración de la aplicación

export const appConfig: ApplicationConfig = { // Exportamos la configuración de la aplicación
  providers: [ // Proveedores globales para la aplicación
    provideBrowserGlobalErrorListeners(), // Proveedor para manejar errores globales en el navegador
    provideZoneChangeDetection({ eventCoalescing: true }), // Proveedor para optimizar la detección de cambios usando Zone.js con combinación de eventos
  ]
};
