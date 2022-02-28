import { createPost } from '../lib/index.js';

export const post = () => {
  const postUser = `
<form class="postUser">
    <input class="coment" id="coment" name="coment"/>
    <button class="toPost" id="toPost">Publicar</button>
    
    <button class="close" id="close">Cerrar</button>
    <button class="deletePost">Eliminar Post</button>
</form>
`;
  const divPostUser = document.createElement('div');
  divPostUser.classList.add('divPosterUser');
  divPostUser.innerHTML = postUser;
  const buttonToPost = document.getElementById('toPost');
  console.log('estoy en post');
  if (buttonToPost) {
    buttonToPost.addEventListener('click', () => {
      console.log('hizo clic en el boton publicar:', buttonClose.getAttribute);

      createPost(buttonToPost);
    });
  }
  const buttonClose = document.getElementById('close');
  if (buttonClose) {
    buttonClose.addEventListener('click', () => {
      console.log('esta por cerrar y dirigir al muro');
      window.location.hash = '#/wall';
    });
  }

  return divPostUser;
};
