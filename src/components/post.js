import { createPost } from '../lib/index.js';

// se crea el div que contiene la función que crea una publicación

export const post = () => {
  const postUser = `
<form class="postUser" id="postUser">
    <input class="coment" id="coment" name="coment" placeholder="Escriba su publicación"/>
    <button class="toPost" id="toPost">Publicar</button>
    <button class="close" id="close">Cerrar</button>
</form>
`;
  // creacion de div para establecer la sintaxis en el innerHTML
  const divPostUser = document.createElement('div');
  divPostUser.classList.add('divPosterUser');
  divPostUser.innerHTML = postUser;
  const buttonToPost = divPostUser.querySelector('#toPost');
  // Creo una const buttonToPost que me traiga el primer elemento con id toPost del div
  buttonToPost.addEventListener('click', (event) => {
    event.preventDefault(); // para prevenir el comportamiento por defecto
    console.log('hizo clic en el boton publicar:');
    const input = document.getElementById('coment');
    if (input.value === '') {
      alert('No ha escrito nada'); // alerta para que no publique un post vacio.
    } else {
      const postForm = document.getElementById('postUser');
      console.log('post user listener');
      createPost(postForm); // llama a la funcion createPost pasandole el formulario con id postUSer
    }
    divPostUser.innerHTML = '';
  });

  const buttonClose = divPostUser.querySelector('#close');

  buttonClose.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('esta por cerrar y dirigir al muro');
    divPostUser.innerHTML = '';
    window.location.hash = '#/wall'; // cambia la url para dirigirla al muro.
  });
  // retorna el componente divPostUser
  return divPostUser;
};
