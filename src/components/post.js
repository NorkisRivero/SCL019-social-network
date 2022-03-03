import { createPost } from '../lib/index.js';

export const post = () => {
  const postUser = `
<form class="postUser" id="postUser">
    <input class="coment" id="coment" name="coment" placeholder="Escriba su publicación"/>
    <button class="toPost" id="toPost">Publicar</button>
    <button class="close" id="close">Cerrar</button>
    <button class="deletePost">Eliminar Post</button>
</form>
`;
  const divPostUser = document.createElement('div');
  divPostUser.classList.add('divPosterUser');
  divPostUser.innerHTML = postUser;
  const buttonToPost = divPostUser.querySelector('#toPost');
  console.log('estoy en post');

  buttonToPost.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('hizo clic en el boton publicar:');
    const input = document.getElementById('coment');
    if (input.value === '') {
      alert('No ha escrito nada');
    } else {
      const postForm = document.getElementById('postUser');
      console.log('post user listener');
      createPost(postForm);
    }
    // createPost(buttonToPost);
  });

  const buttonClose = divPostUser.querySelector('#close');

  buttonClose.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('esta por cerrar y dirigir al muro');
    divPostUser.innerHTML = '';
    window.location.hash = '#/wall';
  });

  return divPostUser;
};
