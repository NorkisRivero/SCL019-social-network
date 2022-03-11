import { router } from './lib/router.js';
// evento load: se dispara cuando un recurso y sus recursos dependientes han terminado de cargar.
window.addEventListener('load', () => {
  router(window.location.hash);
});
// evento hashchange es ejecutado cuando el fragmento identificador de la URL ha cambiado
window.addEventListener('hashchange', () => {
  router(window.location.hash);
});
