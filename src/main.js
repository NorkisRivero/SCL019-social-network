import { router } from './lib/router.js';

window.addEventListener('load', () => {
  router(window.location.hash);
  // onAuth();
});
window.addEventListener('hashchange', () => {
  router(window.location.hash);
  // onAuth();
});
