import { home } from '../components/home.js';
import { register } from '../components/register.js';
import { wall } from '../components/wall.js';
import {
  eventsRegister,
  login,
  editDeletePost,
  logout,
} from './index.js';
import { editPost } from '../components/editPost.js';

export const router = (hash) => {
  // Llamamos al div del html
  const rootBox = document.getElementById('Container');
  rootBox.innerHTML = ''; // Permite vaciar el div para que no quede componentes anteriores
  // dependiendo del hash se llena el div con los componentes o se llama a alguna función.
  if (hash === '#/' || hash === '/' || hash === '#' || hash === '') {
    rootBox.appendChild(home());
    login(); // llamo al login() para que en este punto home() lo pueda utilizar
  } else if (hash === '#/home') {
    rootBox.appendChild(home());
    login();// llamo al login() para que en este punto home() lo pueda utilizar
  } else if (hash === '#/register') {
    rootBox.appendChild(register());
    eventsRegister(); // llamo al eventsRegister() para que register() lo pueda utilizar
  } else if (hash === '#/wall') {
    rootBox.appendChild(wall());
  } else if (hash === '#/editPost') {
    rootBox.appendChild(editPost());
    editDeletePost(); // llamo al editDeletePost() para que editPost() lo pueda utilizar
  } else if (hash === '#/logout') {
    logout();
  }
};
