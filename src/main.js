// Este es el punto de entrada de tu aplicacion

// import { home } from './components/home.js';
import { router } from './lib/router.js';
// import { register } from './components/register.js';
//
// register();
// home();
// router();
// const registers = document.getElementById('aregister');
// if (registers) {
//   registers.addEventListener('click', () => { register(); });
// }

window.addEventListener('load', () => {
  router(window.location.hash);
  // onAuth();
});
window.addEventListener('hashchange', () => {
  router(window.location.hash);
  // onAuth();
});
